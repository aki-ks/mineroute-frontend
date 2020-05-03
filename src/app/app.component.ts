import { Component, OnInit} from '@angular/core';
import { AppService, Server, ServerStatus } from './app.service';
import { merge, Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddServerComponent } from './add-server/add-server.component';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  socket: string;
  domain: string;
  servers: Observable<Array<Server>>;

  reloadServers = new Subject<void>();

  serverMetas: {[name: string]: Observable<ServerStatus>} = {};

  constructor(
    private appService: AppService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.servers = merge([null], this.reloadServers).pipe(
      switchMap(() => this.appService.getServers()),
      map(servers => servers.sort((a, b) =>
        a.domain.toLowerCase().localeCompare(b.domain.toLowerCase()))),
      distinctUntilChanged()
    );
  }

  add() {
    const dialog = this.dialog.open(AddServerComponent, {width: '350px'});
    dialog.afterClosed().subscribe(wasAdded => {
      if (wasAdded) {
        this.reloadServers.next();
      }
    });
  }

  loadServer(domain: string) {
    this.serverMetas[domain] = this.appService.getServer(domain);
  }

  deleteServer(domain: string) {
    this.appService.delete(domain)
      .subscribe(() => this.reloadServers.next());
  }
}
