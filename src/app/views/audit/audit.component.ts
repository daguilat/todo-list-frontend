import { Component, OnInit } from '@angular/core';
import { AuditI } from 'src/app/model/audit.interface';
import { AuditService } from 'src/app/services/audit.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  audits : AuditI[] = [];

  constructor(private auditService:AuditService) { }

  ngOnInit(): void {
    this.auditService.getAllAudits().subscribe(data => {
      this.audits = data;
    });

  }

}
