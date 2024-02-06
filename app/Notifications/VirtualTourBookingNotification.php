<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VirtualTourBookingNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $propertyTitle;
    public $propertyModel;
    public $propertyId;
    public $details;

    /**
     * Create a new notification instance.
     */
    public function __construct($message)
    {
        $this->propertyTitle = $message['propertyTitle'];
        $this->propertyModel = $message['propertyModel'];
        $this->propertyId = $message['propertyId'];
        $this->details = $message['details'];
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('Your listing ' . $this->propertyTitle . ' has been prioritized for a virtual tour.')
                    ->line($this->details)
                    ->action('My Property', url('/' .$this->propertyModel. '/' . $this->propertyId))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
