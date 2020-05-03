import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Server {
  sockaddr: string;
  domain: string;
}

export interface ServerStatus extends Server{
  players: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  backend = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  upload(sockaddr: string, domain: string) {
    const obj: Server = {sockaddr, domain};
    return this.http.post(this.backend + '/api/servers', obj);
  }

  getServers(): Observable<Array<Server>> {
    return this.http.get<Array<Server>>(this.backend + '/api/servers');
  }

  getServer(key: string) {
    return this.http.get<ServerStatus>(this.backend + '/api/servers/' + key);
  }

  delete(server: string) {
    return this.http.delete<ServerStatus>(this.backend + '/api/servers/' + server);
  }
}
