// import './TopList.css';
// import { useState } from 'react';

// function TopList({ onAddWord }) {
//   const [formData, setFormData] = useState({
//     word: '',
//     transcription: '',
//     translate: '',
//     tags: ''
//   });

//   const [errors, setErrors] = useState({
//     word: false,
//     transcription: false,
//     translate: false,
//     tags: false
//   });

//   const [isSaving, setIsSaving] = useState(false);

//   const handleChange = (evt) => {
//     const { name, value } = evt.target;
//     const fieldName = name.replace('input', '').toLowerCase();
    
//     setFormData(prev => ({ ...prev, [fieldName]: value }));
    
//     // Валидация на пустоту
//     setErrors(prev => ({ ...prev, [fieldName]: value.trim() === '' }));
//   };

//   const handleCancel = () => {
//     // Сбрасываем форму к начальным значениям
//     setFormData({
//       word: '',
//       transcription: '',
//       translate: '',
//       tags: ''
//     });
    
//     // Сбрасываем ошибки
//     setErrors({
//       word: false,
//       transcription: false,
//       translate: false,
//       tags: false
//     });
//   }

//   const handleSave = async () => {
//     // Проверка на заполненность всех полей
//     const hasEmptyFields = Object.values(formData).some(val => val.trim() === '');
//     if (hasEmptyFields) {
//       alert('Заполните все поля!');
//       setErrors({
//         word: formData.word.trim() === '',
//         transcription: formData.transcription.trim() === '',
//         translate: formData.translate.trim() === '',
//         tags: formData.tags.trim() === ''
//       });
//       return;
//     }

//     setIsSaving(true);

//     try {
//       const response = await fetch('https://itgirlschool.justmakeit.ru/api/words/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // 'Authorization': 'Bearer YOUR_TOKEN' // если требуется
//         },
//         body: JSON.stringify({
//           english: formData.word,
//           transcription: formData.transcription,
//           russian: formData.translate,
//           tags: formData.tags // Теперь передаем просто строку, а не массив
//         })
//       });

//       if (!response.ok) {
//         throw new Error('Ошибка при добавлении слова');
//       }

//       const newWord = await response.json();

//       // Очищаем форму
//       setFormData({
//         word: '',
//         transcription: '',
//         translate: '',
//         tags: ''
//       });

//       // Уведомляем родительский компонент о новом слове
//       if (onAddWord) {
//         onAddWord(newWord);
//       }

//       alert('Слово успешно добавлено!');
//     } catch (error) {
//       console.error('Ошибка:', error);
//       alert('Не удалось добавить слово: ' + error.message);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <>
//       <div className="table-data index"></div>
//       <div className="table-data index">
//         <input 
//           name="inputWord" 
//           value={formData.word}
//           className={'table-data index top ' + (errors.word ? 'red' : '')} 
//           onChange={handleChange} 
//           placeholder="Слово"
//         />
//       </div>
//       <div className="table-data index">
//         <input 
//           name="inputTranscription" 
//           value={formData.transcription}
//           className={'table-data index top ' + (errors.transcription ? 'red' : '')} 
//           onChange={handleChange} 
//           placeholder="Транскрипция"
//         />
//       </div>
//       <div className="table-data index">
//         <input 
//           name="inputTranslate" 
//           value={formData.translate}
//           className={'table-data index top ' + (errors.translate ? 'red' : '')} 
//           onChange={handleChange} 
//           placeholder="Перевод"
//         />
//       </div>
//       <div className="table-data index">
//         <input 
//           name="inputTags" 
//           value={formData.tags}
//           className={'table-data index top ' + (errors.tags ? 'red' : '')} 
//           onChange={handleChange} 
//           placeholder="Тег"
//         />
//       </div>
//       <div className="table-data index">
//         <button 
//           className={"button primary save " + (isSaving ? 'disabled' : '')}
//           onClick={handleSave}
//           disabled={isSaving}
//         >
//           {isSaving ? 'Сохранение...' : 'Сохранить'}
//         </button>
//         <button className="button touch cancel" onClick={handleCancel}>{' '}</button>
//       </div>
//     </>
//   );
// }

// export default TopList;


import './TopList.css';
import { useState, useMemo } from 'react';

function TopList({ onAddWord }) {
  const [formData, setFormData] = useState({
    word: '',
    transcription: '',
    translate: '',
    tags: ''
  });

  const [errors, setErrors] = useState({
    word: false,
    transcription: false,
    translate: false,
    tags: false
  });

  const [isSaving, setIsSaving] = useState(false);

  // Проверяем, все ли поля заполнены
  const isFormValid = useMemo(() => {
    return (
      formData.word.trim() !== '' &&
      formData.transcription.trim() !== '' &&
      formData.translate.trim() !== '' &&
      formData.tags.trim() !== ''
    );
  }, [formData]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const fieldName = name.replace('input', '').toLowerCase();
    
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Валидация на пустоту
    setErrors(prev => ({ ...prev, [fieldName]: value.trim() === '' }));
  };

  const handleCancel = () => {
    setFormData({
      word: '',
      transcription: '',
      translate: '',
      tags: ''
    });
    setErrors({
      word: false,
      transcription: false,
      translate: false,
      tags: false
    });
  };

  const handleSave = async () => {
    if (!isFormValid) return;

    setIsSaving(true);

    try {
      const response = await fetch('https://itgirlschool.justmakeit.ru/api/words/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          english: formData.word,
          transcription: formData.transcription,
          russian: formData.translate,
          tags: formData.tags
        })
      });

      if (!response.ok) throw new Error('Ошибка при добавлении слова');

      const newWord = await response.json();
      setFormData({ word: '', transcription: '', translate: '', tags: '' });

      if (onAddWord) onAddWord(newWord);
      alert('Слово успешно добавлено!');
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Не удалось добавить слово: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="table-data index"></div>
      <div className="table-data index">
        <input 
          name="inputWord" 
          value={formData.word}
          className={'table-data index top ' + (errors.word ? 'red' : '')} 
          onChange={handleChange} 
          placeholder="Слово"
        />
      </div>
      <div className="table-data index">
        <input 
          name="inputTranscription" 
          value={formData.transcription}
          className={'table-data index top ' + (errors.transcription ? 'red' : '')} 
          onChange={handleChange} 
          placeholder="Транскрипция"
        />
      </div>
      <div className="table-data index">
        <input 
          name="inputTranslate" 
          value={formData.translate}
          className={'table-data index top ' + (errors.translate ? 'red' : '')} 
          onChange={handleChange} 
          placeholder="Перевод"
        />
      </div>
      <div className="table-data index">
        <input 
          name="inputTags" 
          value={formData.tags}
          className={'table-data index top ' + (errors.tags ? 'red' : '')} 
          onChange={handleChange} 
          placeholder="Тег"
        />
      </div>
      <div className="table-data index">
        <button 
          className={"button primary save " + (!isFormValid || isSaving ? 'disabled' : '')}
          onClick={handleSave}
          disabled={!isFormValid || isSaving}
        >
          {isSaving ? 'Сохранение...' : 'Сохранить'}
        </button>
        <button className="button touch cancel" onClick={handleCancel}>{' '}</button>
      </div>
    </>
  );
}

export default TopList;