import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from '@features/account/account-routing.module';
import { AccountProfileComponent } from '@features/account/pages/account-profile/account-profile.component';
import { AccountUpdateProfileFormComponent } from './forms/account-update-profile-form/account-update-profile-form.component';
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { AccountProfileViewComponent } from './components/account-profile-view/account-profile-view.component';


@NgModule({
  declarations: [
    AccountProfileComponent,
    AccountUpdateProfileFormComponent,
    AccountProfileViewComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    SharedModule
]
})
export class AccountModule { }
