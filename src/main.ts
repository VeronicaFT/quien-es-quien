import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import 'bootstrap/dist/css/bootstrap.min.css';

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
