/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';


import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortable-directive'
import { SignalrService } from '../services/signalr.service';
import { Register } from '../utils/IRegister';

interface SearchResult {
	registers: Register[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number | Date, v2: string | number | Date) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(registers: Register[], column: SortColumn, direction: string): Register[] {
	if (direction === '' || column === '') {
		return registers;
	} else {
		return [...registers].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(country: Register, term: string) {
	return (
		country.firstName.toLowerCase().includes(term.toLowerCase()) ||
		country.surname.toLowerCase().includes(term.toLowerCase()) ||
		country.email.toLowerCase().includes(term.toLowerCase())
	);
}

@Injectable({ providedIn: 'root' })
export class CountryService {
	private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _registers$ = new BehaviorSubject<Register[]>([]);
	private _total$ = new BehaviorSubject<number>(0);

    Registers:Register[]=[]

	private _state: State = {
		page: 1,
		pageSize: 15,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};

	constructor(private pipe: DecimalPipe, public sigService:SignalrService) {
this.sigService.getData().subscribe({
	next:(data:any)=>{
		this.Registers=data
		console.log(data)
		console.log(9990)
	}
})

		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result) => {
				this._registers$.next(result.registers);
				this._total$.next(result.total);
			});

		this._search$.next();
	}

	get registers$() {
		return this._registers$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. sort
		let registers = sort(this.Registers, sortColumn, sortDirection);

		// 2. filter
		registers = registers.filter((student) => matches(student, searchTerm));
		const total = registers.length;

		// 3. paginate
		registers = registers.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ registers, total });
	}
}