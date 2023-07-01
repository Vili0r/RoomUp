<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class PropertyMessageNotification extends Notification
{
    use Queueable;

    public $name;
    public $email;
    public $propertyTitle;
    public $propertyId;
    public $propertyModel;
    public $messageText;

    /**
     * Create a new notification instance.
     */
    public function __construct($message)
    {
        $this->name = $message['name'];
        $this->email = $message['email'];
        $this->propertyTitle = $message['propertyTitle'];
        $this->propertyId = $message['propertyId'];
        $this->propertyModel = $message['propertyModel'];
        $this->messageText = $message['messageText'];
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
        $url = URL::route('message.create', ['id' => $this->propertyId, 'type' => $this->propertyModel]);

        return (new MailMessage)
                    ->line($this->name . '('.$this->email.') has sent you a message about ' . $this->propertyTitle)
                    ->line($this->messageText)
                    ->action('Respond', $url)
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
