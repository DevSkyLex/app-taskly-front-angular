import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTableModule } from '@angular/cdk/table';
import { ReactiveFormsModule } from '@angular/forms';
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
import { TabComponent } from './components/tab/tab.component';
import { TabGroupComponent } from './components/tab/tab-group/tab-group.component';
import { TabLabelDirective } from './directives/tab-label.directive';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RouterModule } from '@angular/router';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { ButtonComponent } from './components/button/button.component';

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
  ButtonComponent
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
