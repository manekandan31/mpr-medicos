from django.urls import path
from .views import student_login, get_video, update_video, get_topic_content, update_topic_content, ai_chat

urlpatterns = [
    path('login/student/', student_login, name='student_login'),
    path('site/video/', get_video, name='get_video'),
    path('site/video/update/', update_video, name='update_video'),
    path('topic/<str:topic_name>/', get_topic_content, name='get_topic_content'),
    path('topic/<str:topic_name>/update/', update_topic_content, name='update_topic_content'),
    path('ai/chat/', ai_chat, name='ai_chat'),
]
