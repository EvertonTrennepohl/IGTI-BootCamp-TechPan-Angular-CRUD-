import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Contact, ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required)
  });
  id: number;

  constructor(private contacstSercice: ContactsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.id = parseInt(paramMap.get('id'));
      this.contacstSercice.retrieveContact(this.id).subscribe(contact => {
        this.contactForm.reset(contact);
      });
    })
  }

  updateContact(): void {
    this.contacstSercice.updateContact({ id: this.id, ...this.contactForm.value })
    .subscribe(contact => { this.contactForm.reset(contact);
    });
  }

}