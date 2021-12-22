import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Character } from "@app/share/interfaces/character.interface";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-component-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CharacterCardComponent {
  @Input() detail:boolean = false;
  fontsIcons = {
    faClock: faClock,
    faGlobe: faGlobe
  }
  @Input() character!: Character;
}
