
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';


import { CountryService } from '../country.service';
import { NgbdSortableHeader, SortEvent } from '../sortable-directive';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Register } from '../../utils/IRegister';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { EmailService } from '../../services/email.service';

@Component({
	selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
	standalone: true,
	imports: [DecimalPipe, FormsModule, AsyncPipe, NgbHighlight, NgbdSortableHeader, NgbPaginationModule],
	
	providers: [CountryService, DecimalPipe],
})
export class TableComponent {
	registers$!: Observable<Register[]>;
	total$: Observable<number>;

	@ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

	constructor(public service: CountryService,public sharedS:SharedService, private router:Router, private emailS:EmailService) {
		this.registers$ = service.registers$;
		this.total$ = service.total$;
	
	}
	ngOnInit(){
		this.sharedS.emitSearchItem$.subscribe({
			next:(x)=>{
               this.service.searchTerm = x
			},
			error:(x)=>{
console.log('anfa oo')
			}
		})
	}

	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		this.service.sortColumn = column;
		this.service.sortDirection = direction;
	}

	shareEmail(id: number) 
	{
		this.getPostProfileData(id)
          this.sharedS.shareId.next(id)
		  this.router.navigate(['/sp'])
	}
	getPostProfileData(id:number){
		this.emailS.getStudentId(id).subscribe({
		  next: (x:any)=>{
			this.sharedS.profileSearch = x;
		  }
		})
	  }
}