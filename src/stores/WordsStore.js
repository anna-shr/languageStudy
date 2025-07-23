import { makeAutoObservable, runInAction } from "mobx";

class WordStore {
  words = [];
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchWords = async () => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      //await new Promise(resolve => setTimeout(resolve, 2000)); проверка лоадера
      
      const response = await fetch('https://itgirlschool.justmakeit.ru/api/words');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      
      runInAction(() => {
        this.words = data;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
        this.isLoading = false;
      });
    }
  };

  addWord = async (word) => {
    try {
      const response = await fetch('https://itgirlschool.justmakeit.ru/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(word)
      });

      if (!response.ok) throw new Error('Не удалось добавить слово');

      const newWord = await response.json();
      
      runInAction(() => {
        this.words.push(newWord);
      });
      return newWord;
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
      });
      throw error;
    }
  };

  updateWord = async (id, updatedData) => {
    try {
      const response = await fetch(`https://itgirlschool.justmakeit.ru/api/words/${id}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Ошибка при обновлении слова');
      }
      const updatedWord = await response.json();
      
      runInAction(() => {
        this.words = this.words.map(word => 
          word.id === id ? { ...word, ...updatedWord } : word
        );
      });
      return updatedWord;
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
      });
      throw error;
    }
  };

  deleteWord = async (id) => {
    try {
      const response = await fetch(`https://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Ошибка при удалении слова');
      runInAction(() => {
        this.words = this.words.filter(word => word.id !== id);
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
      });
      throw error;
    }
  };
}

const wordsStore = new WordStore();
export default wordsStore;