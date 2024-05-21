import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "../../environments/environment.development";
import { IChat } from "../interface/chat-response";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private supabase: SupabaseClient;
  public savedChat = signal({});

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async chatMessage(text: string) {
    try {
      const { data, error } = await this.supabase.from('chat').insert({ text });
      if (error) {
        alert(error.message);
      }
      return data;
    } catch (error) {
      alert(error);
      return;
    }
  }

  async listChat() {
    try {
      const { data, error } = await this.supabase.from('chat').select('*,users(*)');
      if (error) {
        alert(error.message);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteChat(id: string) {
    const data = await this.supabase.from('chat').delete().eq('id', id);
    return data;
  }

  selectedChats(msg: IChat) {
    this.savedChat.set(msg);
  }
}
