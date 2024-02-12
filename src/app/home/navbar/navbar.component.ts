import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faUserTie, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {


  faUserTie = faUserTie;
  faArrowRight = faArrowRight;

  aboutUsTooltipText = `Nature is the connection between the physical world surrounding us and the life inside us. Nature is God’s most precious and valuable gift to humans. It is the principal source of all essential nutrients for all living things on the planet. ‘Nature’ is one of the topics on which we might be asked to write a paragraph.Check the samples provided in the article to learn how to write one on your own.
  Nature is the connection between the physical world surrounding us and the life inside us. Nature is God’s most precious and valuable gift to humans. It is the principal source of all essential nutrients for all living things on the planet. ‘Nature’ is one of the topics on which we might be asked to write a paragraph. Check the samples provided in the article to learn how to write one on your own.
  Nature is the connection between the physical world surrounding us and the life inside us. Nature is God’s most precious and valuable gift to humans. It is the principal source of all essential nutrients for all living things on the planet. ‘Nature’ is one of the topics on which we might be asked to write a paragraph. Check the samples provided in the article to learn how to write one on your own.
  Nature is the connection between the physical world surrounding us and the life inside us. Nature is God’s most precious and valuable gift to humans. It is the principal source of all essential nutrients for all living things on the planet. ‘Nature’ is one of the topics on which we might be asked to write a paragraph. Check the samples provided in the article to learn how to write one on your own.
  Nature is the connection between the physical world surrounding us and the life inside us. Nature is God’s most precious and valuable gift to humans. It is the principal source of all essential nutrients for all living things on the planet. ‘Nature’ is one of the topics on which we might be asked to write a paragraph. Check the samples provided in the article to learn how to write one on your own.
  Nature is the connection between the physical world surrounding us and the life inside us. Nature is God’s most precious and valuable gift to humans. It is the principal source of all essential nutrients for all living things on the planet. ‘Nature’ is one of the topics on which we might be asked to write a paragraph. Check the samples provided in the article to learn how to write one on your own.
  Nature is the connection between the physical world surrounding us and the life inside us. Nature is God’s most precious and valuable gift to humans. It is the principal source of all essential nutrients for all living things on the planet. ‘Nature’ is one of the topics on which we might be asked to write a paragraph. Check the samples provided in the article to learn how to write one on your own.`;


  showAboutUsTooltip = false;
}


