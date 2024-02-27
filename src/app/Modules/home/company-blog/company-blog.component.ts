import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Core/services/shared.service';

@Component({
  selector: 'app-company-blog',
  templateUrl: './company-blog.component.html',
  styleUrls: ['./company-blog.component.scss']
})
export class CompanyBlogComponent implements OnInit {
onHover : boolean = false;
constructor(private sharedService:SharedService){}

ngOnInit() {
  this.sharedService.onHover.subscribe((visible: boolean) => {
    this.onHover = visible;
  });
}
  onHoverMouseLeave(){
this.sharedService.setToFalse('onHover');
  }
}
