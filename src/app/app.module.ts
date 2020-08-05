import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { Ng5SliderModule } from 'ng5-slider';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatIconModule } from "@angular/material/icon";
import { environment } from '../environments/environment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DaytimeChartComponent } from './components/daytime-chart/daytime-chart.component';
import { InstagramProfileComponent } from './components/instagram-profile/instagram-profile.component';
import { PostLikesChartComponent } from './components/post-likes-chart/post-likes-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashtagCountChartComponent } from './components/hashtag-count-chart/hashtag-count-chart.component';
import { SponsoredChartComponent } from './components/sponsored-chart/sponsored-chart.component';
import { InstagramComparisonsComponent } from './components/instagram-comparisons/instagram-comparisons.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PostLikesComparisonChartComponent } from './components/post-likes-comparison-chart/post-likes-comparison-chart.component';
import { DateSliderComponent } from './components/date-slider/date-slider.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
    declarations: [
        AppComponent,
        DaytimeChartComponent,
        InstagramProfileComponent,
        PostLikesChartComponent,
        HashtagCountChartComponent,
        SponsoredChartComponent,
        InstagramComparisonsComponent,
        NavigationComponent,
        PostLikesComparisonChartComponent,
        DateSliderComponent,
        AboutComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        AngularFirestoreModule.enablePersistence(),
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatListModule,
        MatIconModule,
        MatButtonToggleModule,
        MatExpansionModule,
        Ng5SliderModule,
        // import HttpClientModule after BrowserModule.
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'My-Xsrf-Cookie',
            headerName: 'My-Xsrf-Header',
        }),

        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, {
            dataEncapsulation: false,
            passThruUnknownUrl: true,
            put204: false // return entity after PUT/update
        }),

        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
