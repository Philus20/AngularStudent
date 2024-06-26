import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Register } from '../utils/IRegister';
import { TopChatAddCounting } from '../utils/IRegister';
import { EmailService } from '../services/email.service';
import { Message } from '../utils/Message';
import { SignalrService } from '../services/signalr.service';
import { SharedService } from '../services/shared.service';
import { CountryService } from '../paginatorAndSearchTest/country.service';
EmailService
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  topChats:Register[]=[];
  topChats2:TopChatAddCounting[]=[]
  baseUrl:string = 'http://localhost:5293/api/Files/';
  activeUser1 !:Register 
  x:number = 0
  students:Register[]=[]
  searchTerm:string =''
  backendMessages:Message[]=[]
  b:Message[]=[]
   service!:CountryService
  constructor(
    private router:Router, 
   
     public modal2:NgbModal, 
     public modal:NgbActiveModal,
     private emailService:EmailService, 
     private signalR:SignalrService,
     private sShare:SharedService

  ){
    
    this.signalR.getData().subscribe({

      next:(x:any)=>{
        this.students=x
      }
    })
  }

  get filteredRegisters(): Register[] {
    return this.students.filter(register =>
      register.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      register.surname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      register.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      // Add more fields if you want to include them in the search
    );
  }

  onSearchChange(value: string) {
   
    this.searchTerm = value;
    this.sShare.shareSearchItem(this.searchTerm);
    console.log('okyy'+6788)
     //console.log(this.searchTerm)
    // for(let x of this.filteredRegisters){
    //   console.log(x.firstName)
    // }
//
    // this.sShare.shareSeachStudent(this.filteredRegisters)
    this.sShare.emitSearchTrueOrFalse.next(false)
    //this.modal2.open(EditProfileComponent)
  }
  displayMain(){
    this.sShare.emitSearchTrueOrFalse.next(true)
  }
  ngOnInit(){
// for(let x of this.filteredRegisters){
// console.log(x.firstName)
}


  
    
  




   open(){
   this.modal2.open(EditProfileComponent)
   }
  logout(){
    console.log('fjjj')
    localStorage.removeItem('loginData')
    this.emailService.checking("2","4")
    this.router.navigate(['/log']);
   }
   accountSettings(){
    
    this.router.navigate(['/account']);
   }


   goToMes(){
    
this.router.navigate(['/mes'])
  //this.getTopChats()
   }
  //  getTopChats(){
  //   this.emailService.getTopChats(this.emailService.userInformation.id).subscribe({
  //     next:(data:any)=>{
  //       this.topChats=data
             

  //     }
  //   })


  //   for(let user of this.topChats){
      
      
  //     this.emailService.getMessage(this.emailService.userInformation.email,user.email).subscribe({
  //       next: (data:any)=>{
  //         this.b = []
  //            this.backendMessages=data
  //            this.emailService.backendMessages.push(data)
            
  //            console.log(this.backendMessages[0])
  //            for(let message of  this.backendMessages ){
             
  //             if((message.receiverEmail == this.emailService.userInformation.email && message.senderEmail==user.email)&& message.status=="0"){
  //                 this.b.push(message)
  //           }
           
  //           }
  //           const User:TopChatAddCounting={
  //             id:user.id,
  //             firstName:user.firstName,
  //             surname:user.surname,
  //             profilePictureName:user.profilePictureName,
  //             unread:this.b.length
  //           }
  //           console.log(User.unread)
  //           this.topChats2.push(User)
          
  //     },
  //     error:(r)=>{
  //       console.log(r)
  //    } })
    
 
  
  
  
  //   }
  //   this.emailService.emitTopchats(this.topChats2)
  //  }

   private getMessage2(email:string,active:string){
    this.emailService.getMessage(email,active).subscribe({
      next: (data:any)=>{
           this.emailService.backendMessages =data
           this.emailService.backendMessages
           console.log(3333333333333333333333333)
           console.log(data)
    },
    error:(r)=>{
      console.log(r)
   } })
  }

  forum(){
    this.router.navigate(['/fm'])
  }

}
