import { Component, OnInit } from '@angular/core';
import { InstanceService } from '../../instances/instance.service';
import { ActivatedRoute } from '@angular/router';
import * as yaml from 'js-yaml';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  private id: string;

  model: string;
  modelYAML: any;
  annotations: string[];
  options: Object;
  instance: any;

  constructor(
    private route: ActivatedRoute,
    private instances: InstanceService) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getConfiguration(this.id); 
    this.getInstance(this.id);
    this.options = {
      folding: true,
      minimap: { enabled: true },
      readOnly: false,
      language: 'yaml',
    };
  }

  getConfiguration(id: string): void {
    this.instances.getConfiguration(id).subscribe((data: string) => {
      this.model = data;
      try {
        this.modelYAML = yaml.safeLoad(data);
        this.annotations = Object.keys(this.modelYAML.metadata.annotations)
      } catch (e) {
        this.modelYAML = {};
      }
    });
  }

  getInstance(id: string) {
    this.instances.getInstance(id).subscribe((data: any) => {
      this.instance = data;
    });
  }
}
