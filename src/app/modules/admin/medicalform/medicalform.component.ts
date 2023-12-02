import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'medicalform',
  standalone: true,
  templateUrl: './medicalform.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports        : [RouterOutlet],
})
export class MedicalformComponent {

    /**
     * Constructor
     */
    constructor()
    {
    }
}
