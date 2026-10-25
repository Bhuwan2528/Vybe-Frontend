
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth implements OnInit, OnDestroy {
  isSignup = false;
  otpStep = false;

  mobileNumber = '';
  otp = '';

  feedback = '';
  feedbackType: 'info' | 'error' | 'success' = 'info';

  private routeSubscription?: Subscription;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.updatePageMode(this.router.url);

    this.routeSubscription = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.updatePageMode(event.urlAfterRedirects);
      });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  onMobileInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.mobileNumber = input.value
      .replace(/\D/g, '')
      .slice(0, 10);

    input.value = this.mobileNumber;
    this.feedback = '';
  }

  onOtpInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.otp = input.value
      .replace(/\D/g, '')
      .slice(0, 6);

    input.value = this.otp;
    this.feedback = '';
  }

  requestOtp(): void {
    if (!/^[6-9]\d{9}$/.test(this.mobileNumber)) {
      this.setFeedback(
        'Enter a valid 10-digit mobile number.',
        'error'
      );
      return;
    }

    this.otp = '';
    this.otpStep = true;
    this.feedback = '';
  }

  changeNumber(): void {
    this.otpStep = false;
    this.otp = '';
    this.feedback = '';
  }

  verifyOtp(): void {
    if (!/^\d{6}$/.test(this.otp)) {
      this.setFeedback(
        'Enter the complete 6-digit OTP.',
        'error'
      );
      return;
    }

    this.setFeedback(
      'OTP entered successfully. Actual verification will be connected later.',
      'success'
    );
  }

  private updatePageMode(url: string): void {
    const path = url.split(/[?#]/)[0];

    this.isSignup = path === '/signup' || path.endsWith('/signup');
    this.otpStep = false;
    this.mobileNumber = '';
    this.otp = '';
    this.feedback = '';
  }

  private setFeedback(
    message: string,
    type: 'info' | 'error' | 'success'
  ): void {
    this.feedback = message;
    this.feedbackType = type;
  }
}
