import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { PatientService } from '@features/patient/services/patient.service';
import { PatientListeResponse } from '@core/models/patient/patient-liste-response';
import { PageResponse } from '@core/shared/page-response.model';



@Component({
  selector: 'app-patient-list-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './patient-list-component.html',
  styleUrl: './patient-list-component.scss',
})
export class PatientListComponent implements OnInit {

  private readonly patientApi = inject(PatientService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly rechercheSubject = new Subject<string>();

  readonly patients = signal<PatientListeResponse[]>([]);
  readonly loading = signal(false);
  readonly suppressionEnCours = signal<string | null>(null);

  readonly recherche = signal('');

  readonly page = signal(0);
  readonly size = signal(20);

  readonly totalElements = signal(0);
  readonly totalPages = signal(0);

  readonly Math = Math;

  ngOnInit(): void {
    this.configurerRecherche();
    this.chargerPatients();
  }

  private configurerRecherche(): void {
    this.rechercheSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((recherche) => {
        this.recherche.set(recherche);
        this.page.set(0);
        this.chargerPatients();
      });
  }

  chargerPatients(): void {
    this.loading.set(true);

    this.patientApi
      .rechercher(
        this.recherche(),
        this.page(),
        this.size(),
        'nom,asc'
      )
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response: PageResponse<PatientListeResponse>) => {
          this.patients.set(response.content);
          this.totalElements.set(response.totalElements);
          this.totalPages.set(response.totalPages);
        },
        error: (error) => {
          console.error(
            'Erreur lors du chargement des patients',
            error
          );

          this.patients.set([]);
          this.totalElements.set(0);
          this.totalPages.set(0);
        }
      });
  }

  rechercher(value: string): void {
    this.rechercheSubject.next(value);
  }

  ajouterPatient(): void {
    void this.router.navigate(['/patient/create']);
  }

  modifierPatient(patient: PatientListeResponse): void {
    void this.router.navigate(['/patient/edit', patient.uuid]);
  }

  consulterPatient(patient: PatientListeResponse): void {
    void this.router.navigate(['/patient', patient.uuid]);
  }

  supprimerPatient(patient: PatientListeResponse): void {
    const nomComplet = `${patient.prenom} ${patient.nom}`;

    const confirmation = window.confirm(
      `Voulez-vous vraiment supprimer le patient ${nomComplet} ?`
    );

    if (!confirmation) {
      return;
    }

    this.suppressionEnCours.set(patient.uuid);

    this.patientApi
      .supprimer(patient.uuid)
      .pipe(
        finalize(() => this.suppressionEnCours.set(null)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          this.chargerPatients();
        },
        error: (error) => {
          console.error(
            'Erreur lors de la suppression du patient',
            error
          );
        }
      });
  }


  pagePrecedente(): void {
    if (this.page() <= 0) {
      return;
    }

    this.page.update(value => value - 1);
    this.chargerPatients();
  }

  pageSuivante(): void {
    if (this.page() >= this.totalPages() - 1) {
      return;
    }

    this.page.update(value => value + 1);
    this.chargerPatients();
  }

  changerTaillePage(value: string | number): void {
    const nouvelleTaille = Number(value);

    if (!nouvelleTaille || nouvelleTaille <= 0) {
      return;
    }

    this.size.set(nouvelleTaille);
    this.page.set(0);

    this.chargerPatients();
  }


  premiereLigne(): number {
    if (this.totalElements() === 0) {
      return 0;
    }

    return this.page() * this.size() + 1;
  }


  derniereLigne(): number {
    return Math.min((this.page() + 1) * this.size(), this.totalElements());
  }


  afficherSexe(sexe: PatientListeResponse['sexe']): string {
    return sexe === 'MASCULIN' ? 'Masculin' : 'Féminin';
  }

  initiales(patient: PatientListeResponse): string {
    const prenom = patient.prenom?.charAt(0) ?? '';
    const nom = patient.nom?.charAt(0) ?? '';

    return `${prenom}${nom}`.toUpperCase();
  }
}