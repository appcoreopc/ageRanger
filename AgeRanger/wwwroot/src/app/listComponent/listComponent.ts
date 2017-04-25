import { PersonService } from '../services/PersonService';
import { Component, OnInit } from '@angular/core';
import { Person } from '../Person'

@Component({
  selector: 'my-app',
  templateUrl: './listComponent.html'
})

export class ListComponent implements OnInit {
  data: Person[] = [];
  
  constructor(private service: PersonService) {
  }

  ngOnInit() {
    try {

      if (this.service && this.service.listPerson())
        this.service.listPerson().subscribe(x => {
          if (x)
            this.data = x;
        });
    }
    catch (e) {
      console.log(e);
    }
  }
}
