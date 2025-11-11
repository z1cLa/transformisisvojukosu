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
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 15);

    interval(1000).subscribe(() => {
      const now = new Date().getTime();
      const distance = countDownDate.getTime() - now;

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
    const phone = '381613210805'; // no '+' for WhatsApp link
    const message =
      'Zdravo Miona,\nŽelim da rezervišem svoj ekskluzivni HairSpa tretman! 🌸';

    const encodedMessage = encodeURIComponent(message);

    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(url, '_blank');
  }

  sendVoucherMessage() {
    const phone = '381613210805'; // no '+' for WhatsApp link
    const message = [
      'Zdravo Miona,',
      'Želim da poklonim tvoj HairSpa tretman dragoj osobi.',
      'Možeš li mi pomoći oko vaučera? ✨',
    ].join('\n');

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(url, '_blank');
  }

  sendWhatsAppCustom() {
    const phone = '381613210805';
    const messageText =
      this.whatsappText?.trim() || 'Zdravo! Želim više informacija 🌸';

    const encodedMessage = encodeURIComponent(messageText);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(url, '_blank');
  }

  smoothScroll(targetId: string) {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
