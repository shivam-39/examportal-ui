import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/user/dashboard/dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewAllCategoryComponent } from './pages/admin/category/view-all-category/view-all-category.component';
import { AddCategoryComponent } from './pages/admin/category/add-category/add-category.component';
import { ViewAllQuizComponent } from './pages/admin/quiz/view-all-quiz/view-all-quiz.component';
import { AddQuizComponent } from './pages/admin/quiz/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/quiz/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/question/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/question/add-question/add-question.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { QuizInstructionsComponent } from './pages/user/quiz-instructions/quiz-instructions.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        pathMatch: "full"
    },
    {
        path: "signup",
        component: SignupComponent,
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent,
        pathMatch: "full"
    },
    {
        path: "admin-dashboard",
        component: AdminDashboardComponent,
        // pathMatch: "full",
        canActivate: [AdminGuard],
        children: [
            {
                path: '',
                component: WelcomeComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'view-all-category',
                component: ViewAllCategoryComponent
            },
            {
                path: 'add-category',
                component: AddCategoryComponent
            },
            {
                path: 'view-all-quiz',
                component: ViewAllQuizComponent
            },
            {
                path: 'add-quiz',
                component: AddQuizComponent
            },
            {
                path: 'update-quiz/:qid',
                component: UpdateQuizComponent
            },
            {
                path: 'view-quiz-questoins/:qid/:title',
                component: ViewQuizQuestionsComponent
            },
            {
                path: 'add-question/:qid',
                component: AddQuestionComponent
            }
        ]
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        // pathMatch: "full",
        canActivate: [NormalGuard],
        children: [
            {
                path: '',
                component: UserHomeComponent
            },
            {
                path: ':cid',
                component: LoadQuizComponent
            },
            {
                path: ':qid/instructions',
                component: QuizInstructionsComponent
            }
        ]
    },
    {
        path: 'start/:qid',
        component: StartQuizComponent,
        pathMatch: "full",
        canActivate: [NormalGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
