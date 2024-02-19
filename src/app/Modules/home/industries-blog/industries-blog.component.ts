import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Core/services/shared.service';

@Component({
  selector: 'app-industries-blog',
  templateUrl: './industries-blog.component.html',
  styleUrls: ['./industries-blog.component.scss']
})
export class IndustriesBlogComponent implements OnInit  {
  constructor(private sharedService:SharedService){}
ngOnInit(): void {
  this.sharedService.onHoverIndustries.subscribe((visible: boolean) => {
    this.onHoverIndustries = visible;
  });
}
onHoverIndustries : boolean = false;
onIndustryMouseLeave(){
  this.sharedService.setToFalse('onHoverIndustries');
}
}
