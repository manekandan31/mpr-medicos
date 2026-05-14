from django.db import models

class Student(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

class SiteContent(models.Model):
    key = models.CharField(max_length=50, unique=True, default="home_video")
    video_file = models.FileField(upload_to='videos/')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.key

class TopicContent(models.Model):
    topic_name = models.CharField(max_length=100, unique=True)
    video_file = models.FileField(upload_to='topic_videos/', null=True, blank=True)
    pdf_file = models.FileField(upload_to='topic_pdfs/', null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.topic_name
