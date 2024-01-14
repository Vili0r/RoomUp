<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ListingDeletedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $propertyTitle;
    public $propertyModel;
    public $propertyId;

    /**
     * Create a new notification instance.
     */
    public function __construct($message)
    {
        $this->propertyTitle = $message['propertyTitle'];
        $this->propertyModel = $message['propertyModel'];
        $this->propertyId = $message['propertyId'];
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
                    ->line('Your listing ' . $this->propertyTitle . ' has been deleted.')
                    ->line('Please contact customer service for further information.')
                    ->action('RoomUp', route('dashboard'))
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
