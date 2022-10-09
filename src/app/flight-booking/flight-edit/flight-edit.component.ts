import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { never } from 'rxjs';

@Component({
  template: `
    <h1>Flight Edit!</h1>
    <p>The data record with the Id {{ id }} stand!</p>

    <div *ngIf="exitWarning.show" class="alert alert-warning">
      <div>Data was not saved! Still leave the mask?</div>
      <div>
        <a
          href="javascript:void(0)"
          (click)="decide(true)"
          class="btn btn-danger"
          >Ja</a
        >
        <a
          href="javascript:void(0)"
          (click)="decide(false)"
          class="btn btn-default"
          >Nein</a
        >
      </div>
    </div>
  `,
})
export class FlightEditComponent implements OnInit {
  public id?: string;

  constructor(private route: ActivatedRoute) {
    route.params.subscribe((p) => {
      this.id = p['id'];
    });
  }

  ngOnInit() {}

  exitWarning = {
    show: false,
    resolve: null,
  };

  decide(decision: boolean) {
    this.exitWarning.show = false;
  //wtf  this.exitWarning.resolve(decision);
  }

  canDeactivate() {
    this.exitWarning.show = true;
    return new Promise((resolve) => {
    //wtf this.exitWarning.resolve = resolve;
    });
  }
}
