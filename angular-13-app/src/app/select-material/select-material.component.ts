import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_OPTION_PARENT_COMPONENT } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelect, matSelectAnimations } from '@angular/material/select';

@Component({
  selector: 'app-select-material',
  templateUrl: './select-material.component.html',
  styleUrls: ['./select-material.component.scss'],
  providers: [
    {provide: MatFormFieldControl, useExisting: SelectMaterialComponent},
    {provide: MAT_OPTION_PARENT_COMPONENT, useExisting: SelectMaterialComponent},
  ],
})
export class SelectMaterialComponent extends MatSelect implements OnInit {

}
