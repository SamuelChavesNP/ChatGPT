"use client"

import { ChatArea } from "@/components/ChatArea";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SidebarChatButton } from "@/components/SidebarChatButton";
import Sidebar from "@/components/Siderbar";
import { Chat } from "@/types/Chat";
import { openai } from "@/utils/openai";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Page = () => {
  const [AILoading, setAILoading] = useState(false);
  const [siderbarOpened, setSidebarOpened] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [chatActiveId, setChatActiveId] = useState<string>('');
  const [chatActive, setChatActive] = useState<Chat>();

  useEffect(() => {
    setChatActive(chatList.find(item => item.id === chatActiveId));
  }, [chatActiveId, chatList])

  useEffect(() => {
    if(AILoading) getAILoadingResponse();
  },[AILoading])

  const openSiderbar = () => setSidebarOpened(true);
  const closeSidebar = () => setSidebarOpened(false);

  const getAILoadingResponse = async () => {
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId);

      if (chatIndex > -1) {
        const response = await openai.generate(
          openai.translateMessage(chatListClone[chatIndex].message)
        );

        if(response) {
          chatListClone[chatIndex].message.push({
            id: uuidv4(),
            author: 'ai',
            body: response
          });
        }
      }
      setChatList(chatListClone);
      setAILoading(false);
  }

  const handleClearConversation = () => {
    if(AILoading) return;

    setChatActiveId('')
    setChatList([]);
  }

  const handleNewChat = () => {
    if(AILoading) return;

    setChatActiveId('');
    closeSidebar();
  }

  const handleSendMessage = (message: string) => {
    if(!chatActiveId) {
      let newChatId = uuidv4();

      setChatList([{
        id: newChatId,
        title: message,
        message: [
          {id: uuidv4(), author: 'me', body: message}
        ]
      }, ...chatList]);

      setChatActiveId(newChatId);
    } 
    else {
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId);
      chatListClone[chatIndex].message.push({
        id: uuidv4(),
        author: 'me',
        body: message,
      })
      setChatList(chatListClone);
    }
    setAILoading(true);
  }

  const handleSelectChat = (id: string) => {
    if(AILoading) return;

    let item = chatList.find(item => item.id === id);
    if(item) setChatActiveId(item.id);
    closeSidebar();
  }

  const handleDelete = (id: string) => {
    let chatListClone = [...chatList];
    let chatIndex = chatListClone.findIndex(item => item.id === id);
    chatListClone.splice(chatIndex, 1);
    setChatList(chatListClone);
    setChatActiveId('');
  }

  const handleEdit = (id: string, newTitle:string) => {
    if(newTitle) {
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex(item => item.id === id);
      chatListClone[chatIndex].title = newTitle;
      setChatList(chatListClone);
  }
}

  return (
    <main className="flex bg-gpt-gray min-h-screen">

      <Sidebar onClear={handleClearConversation} open={siderbarOpened} onClose={closeSidebar} onNewChat={handleNewChat}>
        {chatList.map(item => (
          <SidebarChatButton 
          key={item.id} chatItem={item} active={item.id === chatActiveId}
          onClick={handleSelectChat} onDelete={handleDelete} onEdit={handleEdit}
          />
        ))}
      </Sidebar>

      <section className="flex flex-col w-full">
        <Header openSiderbarClick={openSiderbar} title={chatActive ? chatActive.title : 'SamuGPT'} newChatClick={handleNewChat}/>

        <ChatArea chat={chatActive} loading={AILoading}/>

        <Footer onSendMessage={handleSendMessage} disabled={AILoading}/>
      </section>

    </main>
  )
}

export default Page;