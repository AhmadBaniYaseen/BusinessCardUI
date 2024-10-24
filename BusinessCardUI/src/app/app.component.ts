import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BusinessCardComponent } from './business-card.component'; 
import { CreateBusinssCardComponent } from './create-businss-card/create-businss-card.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BusinessCardComponent, CreateBusinssCardComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BusinessCardUI';
}
