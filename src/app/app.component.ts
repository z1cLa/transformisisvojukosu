import { AfterViewInit, Component, ElementRef } from '@angular/core';

import { interval } from 'rxjs';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  whatsappText: string = '';
  currentYear = new Date().getFullYear();

  timeLeft: TimeLeft = {
    days: 15,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  private startTimer() {
    // 🎯 Set the start date to 11.11.2025 at 14:00 Serbian time
    const startDate = new Date(2025, 10, 11, 14, 0, 0); // November 11, 2025, 14:00:00

    // 🎯 End date = startDate + 15 days
    const countDownDate = new Date(startDate);
    countDownDate.setDate(startDate.getDate() + 15);

    interval(1000).subscribe(() => {
      const now = new Date().getTime();
      const distance = countDownDate.getTime() - now;

      // When expired, stop and show zeros
      if (distance <= 0) {
        this.timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return;
      }

      this.timeLeft = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    });
  }

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.startTimer();
    const elements = this.el.nativeElement.querySelectorAll(
      '.scroll-animate, .blur-animate'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // run once per element
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el: HTMLElement) => observer.observe(el));
  }

  sendReserveMessage() {
    const phone = '381613210805';
    const flower = '%F0%9F%8C%B8'; // 🌸

    const message =
      'Zdravo Miona,%0AŽelim da rezervišem svoj ekskluzivni HairSpa tretman! ' +
      flower;

    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.open(url, '_blank');
  }

  sendVoucherMessage() {
    const phone = '381613210805';
    const sparkles = '%E2%9C%A8'; // ✨

    const message =
      'Zdravo Miona,%0AŽelim da poklonim tvoj HairSpa tretman dragoj osobi.%0AMožeš li mi pomoći oko vaučera? ' +
      sparkles;

    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.open(url, '_blank');
  }

  sendWhatsAppCustom() {
    const phone = '381613210805';
    const flower = '%F0%9F%8C%B8'; // 🌸
    const message =
      this.whatsappText?.trim() || `Zdravo! Želim više informacija ${flower}`;

    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.open(url, '_blank');
  }

  smoothScroll(targetId: string) {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
