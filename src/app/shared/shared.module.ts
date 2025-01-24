
import { 
  Bell,
  BellOff,
  BookOpenCheck,
  Bot,
  Building,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  CircleAlert,
  CircleCheck,
  Clock,
  Dot,
  DownloadCloud,
  Ellipsis,
  Eye,
  EyeClosed,
  FileVideo,
  FlaskConical,
  Gauge,
  Headset,
  Home,
  Info,
  KeyRound,
  Layers,
  LayoutDashboard,
  Link,
  ListOrdered,
  Lock,
  LogOut,
  LucideAngularModule,
  Mail,
  MapPinned,
  MoveRight,
  OctagonAlert,
  Paintbrush,
  PanelRightClose,
  PanelRightOpen,
  Pencil,
  Phone,
  Plus,
  Rocket,
  RotateCw,
  Scroll,
  ScrollText,
  Search,
  Send,
  Server,
  Settings,
  ShieldCheck,
  Table,
  Tag,
  Text,
  Trash2,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Upload,
  User,
  X,
} from 'lucide-angular';
import { TabComponent } from '@shared/components/tab/tab.component';
import { TabGroupComponent } from '@shared/components/tab/tab-group/tab-group.component';
import { TabLabelDirective } from '@shared/directives/tab-label.directive';
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import { TooltipDirective } from '@shared/directives/tooltip.directive';
import { ButtonComponent } from '@shared/components/button/button.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { SeparatorComponent } from '@shared/components/separator/separator.component';
import { CollapsibleDirective } from '@shared/directives/collapsible.directive';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { ProfileBadgeComponent } from '@shared/components/profile/profile-badge/profile-badge.component';
import { CommandComponent } from '@shared/components/command/command.component';
import { CommandEmptyComponent } from '@shared/components/command/command-empty/command-empty.component';
import { CommandGroupComponent } from '@shared/components/command/command-group/command-group.component';
import { CommandInputComponent } from '@shared/components/command/command-input/command-input.component';
import { CommandItemComponent } from '@shared/components/command/command-item/command-item.component';
import { CommandListComponent } from '@shared/components/command/command-list/command-list.component';
import { CommandSeparatorComponent } from '@shared/components/command/command-separator/command-separator.component';
import { CommandShortcutComponent } from '@shared/components/command/command-shortcut/command-shortcut.component';
import { ProfileNavComponent } from '@shared/components/profile/profile-nav/profile-nav.component';
import { GanttComponent } from '@shared/components/gantt/gantt.component';
import { InputTextComponent } from '@shared/components/input/input-text/input-text.component';
import { InputSelectComponent } from '@shared/components/input/input-select/input-select.component';
import { FormComponent } from './components/form/form.component';
import { FormControlComponent } from './components/form/form-control/form-control.component';
import { InputLabelComponent } from './components/input/input-label/input-label.component';
import { InputErrorComponent } from './components/input/input-error/input-error.component';
import { InputHelpComponent } from './components/input/input-help/input-help.component';
import { InputPhoneComponent } from './components/input/input-phone/input-phone.component';
import { InputCheckboxComponent } from './components/input/input-checkbox/input-checkbox.component';
import { InputDateComponent } from './components/input/input-date/input-date.component';
import { InputFileComponent } from './components/input/input-file/input-file.component';
import { InputTimeComponent } from './components/input/input-time/input-time.component';
import { InputTextareaComponent } from './components/input/input-textarea/input-textarea.component';

const Directives: Type<any>[] = [
  TabLabelDirective,
  TooltipDirective
];

const Pipes: Type<any>[] = [

];

const Components: Type<any>[] = [
  TabComponent,
  TabGroupComponent,
  TooltipComponent,
  ButtonComponent,
  LoaderComponent,
  BreadcrumbComponent,
  SeparatorComponent,
  CollapsibleDirective,
  AvatarComponent,
  ProfileBadgeComponent,
  ProfileNavComponent,
  CommandComponent,
  CommandEmptyComponent,
  CommandGroupComponent,
  CommandInputComponent,
  CommandItemComponent,
  CommandListComponent,
  CommandSeparatorComponent,
  CommandShortcutComponent,
  GanttComponent,
  FormComponent,
  FormControlComponent,
  InputLabelComponent,
  InputErrorComponent,
  InputHelpComponent,
  InputTextComponent,
  InputSelectComponent,
  InputPhoneComponent,
  InputCheckboxComponent,
  InputDateComponent,
  InputFileComponent,
  InputTextareaComponent,
  InputTimeComponent,

];

@NgModule({
  declarations: [
    ...Components,
    ...Directives,
    ...Pipes,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    OverlayModule,
    CdkTableModule,
    CdkAccordionModule,
    ReactiveFormsModule,
    LucideAngularModule.pick({
      Bell,
      BellOff,
      BookOpenCheck,
      Bot,
      Building,
      ChevronsUpDown,
      Building2,
      CalendarDays,
      Check,
      ChevronDown,
      ChevronFirst,
      ChevronLast,
      ChevronLeft,
      ChevronRight,
      CircleAlert,
      CircleCheck,
      Clock,
      Dot,
      DownloadCloud,
      Ellipsis,
      Eye,
      EyeClosed,
      FileVideo,
      FlaskConical,
      Headset,
      Home,
      Info,
      KeyRound,
      Layers,
      LayoutDashboard,
      Link,
      ListOrdered,
      Lock,
      LogOut,
      Mail,
      MapPinned,
      MoveRight,
      OctagonAlert,
      Paintbrush,
      PanelRightClose,
      PanelRightOpen,
      Pencil,
      Phone,
      Plus,
      Rocket,
      RotateCw,
      Scroll,
      ScrollText,
      Search,
      Send,
      Server,
      Settings,
      Table,
      Gauge,
      ShieldCheck,
      Tag,
      Text,
      Trash2,
      TrendingDown,
      TrendingUp,
      TriangleAlert,
      Upload,
      User,
      X,    
    })
  ],
  exports: [
    ...Components,
    ...Directives,
    ...Pipes,
    LucideAngularModule
  ]
})
export class SharedModule { }
