import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
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

  sendVoucherMessage() {
    const phone = '381655053860'; // no '+' for WhatsApp link
    const message = encodeURIComponent(
      'Čestitamo! 🎉 Dobijate vaučer sa 20% popusta za naš frizerski salon. Rezervišite svoj termin još danas! 💇‍♀️💇‍♂️'
    );

    // Opens WhatsApp chat with the given number and message
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank');
  }
}
