from dotenv import load_dotenv
load_dotenv() 

import streamlit as st
import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model=genai.GenerativeModel("gemini-pro") 
chat = model.start_chat(history=[])
def get_gemini_response(question):
    
    response=chat.send_message(question,stream=True)
    return response


st.set_page_config(page_title="She_Bot")

st.header("SahasiShe HelpDesk")

if 'chat_history' not in st.session_state:
    st.session_state['chat_history'] = []

input=st.text_input("Type your question: ",key="input")
submit=st.button("Submit")

if submit and input:
    response=get_gemini_response(input)
    st.session_state['chat_history'].append(("You", input))
    st.subheader("Response: ")
    
    for chunk in response:
        st.write(chunk.text)
        st.session_state['chat_history'].append(("She_Bot", chunk.text))
st.subheader("Chat History: ")
    
for role, text in st.session_state['chat_history']:
    st.write(f"{role}: {text}")