import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CountryRate } from 'src/model/country-rate';
import { CountryRateService } from './country-rate.service';

@Component({
  selector: 'app-country-rate',
  templateUrl: './country-rate.component.html',
  styleUrls: ['./country-rate.component.scss'],
})
export class CountryRateComponent implements OnInit {
  countryRates$!: Observable<CountryRate[]>;
  countryRateForm!: FormGroup;
  vatRates?: number[];

  constructor(
    private readonly service: CountryRateService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.countryRates$ = this.service.list();
    this.countryRateForm = this.formBuilder.group({
      country: [null],
      vatRate: [null],
      vatType: ['0'],
      withoutVat: [0, [Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      addedTax: [0, [Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      inclVat: [0, [Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
    });

    this.handlerCalc('all');
  }

  handlerSelectCountry(event: any) {
    const countryRate = this.countryRateForm.get('country')
      ?.value as CountryRate;
    this.vatRates = countryRate.rates;
    this.countryRateForm.patchValue({ vatRate: [''] });
  }

  handlerVat() {
    this.countryRateForm.get('withoutVat')?.setValue(0);
    this.countryRateForm.get('addedTax')?.setValue(0);
    this.countryRateForm.get('inclVat')?.setValue(0);
    this.countryRateForm.get('vatType')?.setValue('0');

    this.handlerCalc('withoutVat');
  }

  handlerCalc(field: string) {
    console.log(field);
    if (field == 'withoutVat') {
      this.countryRateForm.get('withoutVat')?.enable();
      this.countryRateForm.get('addedTax')?.disable();
      this.countryRateForm.get('inclVat')?.disable();
    }
    if (field == 'addedTax') {
      this.countryRateForm.get('withoutVat')?.disable();
      this.countryRateForm.get('addedTax')?.enable();
      this.countryRateForm.get('inclVat')?.disable();
    }
    if (field == 'inclVat') {
      this.countryRateForm.get('withoutVat')?.disable();
      this.countryRateForm.get('addedTax')?.disable();
      this.countryRateForm.get('inclVat')?.enable();
    }
    if (field == 'all') {
      this.countryRateForm.get('withoutVat')?.disable();
      this.countryRateForm.get('addedTax')?.disable();
      this.countryRateForm.get('inclVat')?.disable();
    }
  }

  handleChange(field: string) {
    const withoutVat = this.countryRateForm.get('withoutVat')?.value;
    const addedTax = this.countryRateForm.get('addedTax')?.value;
    const inclVat = this.countryRateForm.get('inclVat')?.value;

    const vatRate = this.countryRateForm.get('vatRate')?.value;

    if (field == 'withoutVat') {
      const newAddedTax = (withoutVat * (vatRate / 100)).toFixed(2);

      const newInclVat = (
        parseFloat(withoutVat) + parseFloat(newAddedTax)
      ).toFixed(2);
      this.countryRateForm.get('addedTax')?.setValue(newAddedTax);

      this.countryRateForm.get('inclVat')?.setValue(newInclVat);
    }

    if (field == 'addedTax') {
      const newWithoutVat = (addedTax / (vatRate / 100)).toFixed(2);

      const newInclVat = (
        parseFloat(addedTax) + parseFloat(newWithoutVat)
      ).toFixed(2);

      this.countryRateForm.get('withoutVat')?.setValue(newWithoutVat);

      this.countryRateForm.get('inclVat')?.setValue(newInclVat);
    }

    if (field == 'inclVat') {
      const newWithoutVat = (
        (inclVat / (parseFloat(vatRate) + 100)) *
        100
      ).toFixed(2);

      const newAddedTax = (
        parseFloat(inclVat) - parseFloat(newWithoutVat)
      ).toFixed(2);

      this.countryRateForm.get('withoutVat')?.setValue(newWithoutVat);

      this.countryRateForm.get('addedTax')?.setValue(newAddedTax);
    }
  }
}
