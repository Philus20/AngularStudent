import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { MainPageComponent } from './main-page/main-page.component';
import { PostsComponent } from './posts/posts.component';
import { PendingComponent } from './pending/pending.component';
import { MessageComponent } from './message/message.component';
import { LComponent } from './l/l.component';
import { RComponent } from './r/r.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AccountComponent } from './account/account.component';
import { RightComponent } from './right/right.component';
import { ForumMainComponent } from './forum-main/forum-main.component';
import { ForumNavComponent } from './forum-nav/forum-nav.component';
import { AskQuestionsComponent } from './ask-questions/ask-questions.component';
import { SearchImplementationComponent } from './search-implementation/search-implementation.component';
import { TableComponent } from './paginatorAndSearchTest/table/table.component';
import { SearchProfileComponent } from './search-profile/search-profile.component';

const routes: Routes = [
 //{path:'', component: MainPageComponent},
  {path:'log', component:LoginComponent},
  {path:'reg', component:RegisterComponent},
  {path:'edit', component:EditProfileComponent},
 // {path:'main', component:MainPageComponent},
   {path:'main', component:MainPageComponent,canActivate:[AuthService] },
{path:'fm', component:ForumMainComponent},
{path:'fn', component:ForumNavComponent},
{path:'askQuetion',component:AskQuestionsComponent},
  {path:'posts', component:PostsComponent},
{path:'mes',component:MessageComponent},
{path:'',component:LoginComponent},
{path:'l',component:LComponent},
{path:'r',component:RComponent},
{path:'account', component:AccountComponent},
{path:'right', component:RightComponent},
{path:'search', component:SearchImplementationComponent},
{path:'page', component:TableComponent},
{path:'sp',component:SearchProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
