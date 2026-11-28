import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface FeatureCard {
  id: string;
  icon: 'calendar' | 'chart' | 'shield' | 'bolt' | 'headset';
  title: string;
  subtitle?: string;
  colorClass: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-home-page.component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

  private readonly router = inject(Router);

  readonly brandLogoImage = 'assets/landing/pediasaas-logo.png';
  readonly heroDoctorImage = 'assets/landing/doctor-child.png';
  readonly heroDashboardImage = 'assets/landing/dashboard-preview.png';

  mobileMenuOpen = signal(false);

  gotoLogin() {
    console.log('click');
    void this.router.navigate(['/auth/login']);
  }

  features: FeatureCard[] = [
    {
      id: 'rdv',
      icon: 'calendar',
      title: 'Gestion intelligente des rendez-vous',
      subtitle: 'et du suivi patient',
      colorClass: 'icon-blue'
    },
    {
      id: 'stats',
      icon: 'chart',
      title: 'Suivi complet et statistiques',
      subtitle: 'en temps réel',
      colorClass: 'icon-blue'
    },
    {
      id: 'rgpd',
      icon: 'shield',
      title: 'Sécurité & conformité',
      subtitle: 'RGPD',
      colorClass: 'icon-teal'
    },
    {
      id: 'fast',
      icon: 'bolt',
      title: 'Une solution rapide,',
      subtitle: 'simple et intuitive',
      colorClass: 'icon-blue'
    },
    {
      id: 'support',
      icon: 'headset',
      title: 'Un accompagnement',
      subtitle: 'de proximité',
      colorClass: 'icon-blue'
    }
  ];

  // Liste des avantages "Pourquoi choisir pediaSaaS"
  benefits: string[] = [
    'Prise en main immédiate',
    'Conforme aux normes de santé',
    'Adaptée aux cabinets et praticiens',
    'Support réactif et bienveillant'
  ];

  // Témoignages (Carrousel avec Angular Signals)
  testimonials: Testimonial[] = [
    {
      quote: 'pediaSaaS a transformé notre organisation. Un outil simple, puissant et parfaitement adapté à nos besoins.',
      author: 'Dr. Amina Diallo',
      role: 'Médecin généraliste',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80'
    },
    {
      quote: 'Le suivi vaccinal et les courbes de croissance automatisées me font gagner plus d’une heure chaque jour au cabinet.',
      author: 'Dr. Moussa Ndiaye',
      role: 'Pédiatre',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80'
    },
    {
      quote: 'Une interface claire, sécurisée et une équipe support toujours disponible. Mes secrétaires l’ont adopté en 24h.',
      author: 'Dr. Fatou Sow',
      role: 'Clinique Mère-Enfant',
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=150&q=80'
    }
  ];

  activeTestimonialIndex = signal(0);
  currentTestimonial = computed(() => this.testimonials[this.activeTestimonialIndex()]);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  prevTestimonial(): void {
    this.activeTestimonialIndex.update(idx =>
      idx === 0 ? this.testimonials.length - 1 : idx - 1
    );
  }

  nextTestimonial(): void {
    this.activeTestimonialIndex.update(idx =>
      idx === this.testimonials.length - 1 ? 0 : idx + 1
    );
  }

  setTestimonial(index: number): void {
    this.activeTestimonialIndex.set(index);
  }

  gotoRegistrer(): void {
    void this.router.navigate(['auth/register']);
  }
}