import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { MatDialogRef } from '@angular/material/dialog';

const ipDigit = '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
const ipRegex = `${ipDigit}\\.${ipDigit}\\.${ipDigit}\\.${ipDigit}\\:[0-9]+`;

@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.css']
})
export class AddServerComponent {

  serverForm = new FormGroup({
    domain: new FormControl('', Validators.required),
    sockaddr: new FormControl('', [Validators.required, Validators.pattern(ipRegex)])
  });

  constructor(
    private appService: AppService,
    private dialog: MatDialogRef<AddServerComponent>,
  ) {}

  addServer() {
    const { domain, sockaddr } = this.serverForm.value;
    this.appService.upload(sockaddr, domain).subscribe(() => {
      this.dialog.close(true);
    });
  }
}
