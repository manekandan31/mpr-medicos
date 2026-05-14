from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Student, SiteContent, TopicContent
from django.contrib.auth.hashers import make_password, check_password
import google.generativeai as genai
import os

@api_view(['POST'])
def student_login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=400)
    try:
        student = Student.objects.get(email=email)
        if check_password(password, student.password):
            return Response({'message': 'Login successful', 'email': email})
        else:
            return Response({'error': 'Invalid password'}, status=401)
    except Student.DoesNotExist:
        student = Student.objects.create(email=email, password=make_password(password))
        return Response({'message': 'Account created and logged in successfully', 'email': email})

@api_view(['GET'])
def get_video(request):
    content = SiteContent.objects.filter(key="home_video").first()
    if content and content.video_file:
        return Response({'video_url': request.build_absolute_uri(content.video_file.url)})
    return Response({'video_url': "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"})

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def update_video(request):
    video = request.FILES.get('video')
    if not video:
        return Response({'error': 'No video file provided'}, status=400)
    SiteContent.objects.filter(key="home_video").delete()
    content = SiteContent.objects.create(key="home_video", video_file=video)
    return Response({
        'message': 'Video updated successfully', 
        'video_url': request.build_absolute_uri(content.video_file.url)
    })

@api_view(['GET'])
def get_topic_content(request, topic_name):
    content = TopicContent.objects.filter(topic_name=topic_name).first()
    if content:
        return Response({
            'video_url': request.build_absolute_uri(content.video_file.url) if content.video_file else None,
            'pdf_url': request.build_absolute_uri(content.pdf_url) if hasattr(content, 'pdf_url') else None,
        })
    return Response({'video_url': None, 'pdf_url': None})

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def update_topic_content(request, topic_name):
    video = request.FILES.get('video')
    pdf = request.FILES.get('pdf')
    content, created = TopicContent.objects.get_or_create(topic_name=topic_name)
    if video: content.video_file = video
    if pdf: content.pdf_file = pdf
    content.save()
    return Response({
        'message': 'Topic content updated successfully',
        'video_url': request.build_absolute_uri(content.video_file.url) if content.video_file else None,
        'pdf_url': request.build_absolute_uri(content.pdf_file.url) if content.pdf_file else None,
    })

@api_view(['POST'])
def ai_chat(request):
    user_message = request.data.get('message')
    if not user_message:
        return Response({'reply': 'I didn\'t catch that. Could you repeat your question?'})
    
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return Response({'reply': 'My medical knowledge database is offline (Missing API Key in .env).'})
        
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-flash-latest')
        response = model.generate_content(
            f"You are MPR Medicos AI, a premium medical education assistant. Answer this medical query professionally and clearly: {user_message}"
        )
        return Response({'reply': response.text})
    except Exception as e:
        print(f"Gemini Error: {e}")
        return Response({'reply': 'I encountered an error while processing your request. Please check your API key quota or internet connection.'})
