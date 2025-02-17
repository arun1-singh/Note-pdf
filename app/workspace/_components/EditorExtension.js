// import {  AlignCenter, AlignLeft,AlignRight, Bold,  Heading1,  Heading2,  Highlighter,    HighlighterIcon,    Italic ,  Sparkles,  StrikethroughIcon, Underline } from 'lucide-react';
// import { useParams } from 'next/navigation';
// import React from 'react';
// import { useAction, useMutation} from 'convex/react'
// import { api } from '@/convex/_generated/api'
// import { chatSession } from '@/configs/AIModel';
// import { toast } from 'sonner';
// import { useUser } from '@clerk/nextjs';

// function EditorExtension({editor}) {
//   const {fileId}=useParams();
//   const SearchAI=useAction(api.myAction.search)
//   const saveNotes=useMutation(api.notes.AddNotes)
//   const onAiClick=async()=>{
//     toast("AI is getting your answer...")
//       const selectedText=editor.state.doc.textBetween(
//         editor.state.selection.from,
//         editor.state.selection.to,
//         ' '
//       );
//     console.log("selectedText",selectedText);
    
//     const result=await SearchAI({
//       query:selectedText,
//       fileId:fileId
//     })
    
//     const UnformattedAns=JSON.parse(result);
//     let AllUnformattedAns='';
//     UnformattedAns&&UnformattedAns.forEach(item=>{
//     AllUnformattedAns=AllUnformattedAns+item.pageContent
//     });
    
//    const PROMPT="For question :"+selectedText+" and with the given content as answer,"+
//    " please give appropriate answer in HTML format. The answer content is: "+AllUnformattedAns;
//    const AiModelResult=await chatSession.sendMessage(PROMPT);
//    console.log(AiModelResult.response.text());
//    const FinalAns=AiModelResult.response.text().replace('```','').replace('html','').replace('```','');


//    const AllText=editor.getHTML();
//   editor.commands.setContent(AllText+'<p> <strong>Answer: </strong>'+FinalAns+' </p>')

//   saveNotes({
//     notes:editor.getHTML(),
//     fileId:fileId,
//   })
//   }
  
//   if (!editor) {
//     return null; // or some fallback UI, like a loading state
//   }
  
//   return editor&&(
//     <div className='p-5 '>
//       <div className="control-group">
//         <div className="button-group flex gap-3">
//           <button
//             onClick={() => editor.chain().focus().toggleBold().run()}
//             className={editor.isActive('bold') ? 'text-blue-500' : ''}
//           >
//             <Bold />
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleItalic().run()}
//             className={editor.isActive('italic') ? 'text-blue-500' : ''}
//           >
//             <Italic/>
            
//           </button>
//           <button
//             onClick={() => editor.chain().focus().setUnderline().run()}
//             disabled={editor.isActive('underline')}
//           >
            
//             <Underline/>
//           </button>
//           <button
//           onClick={() => editor.chain().focus().setTextAlign('left')}
//             className={editor.isActive({ textAlign: 'left' }) ? 'text-red-500' : ''}
//           >
//       <AlignLeft/>
//           </button>
//           <button
//           onClick={() => editor.chain().focus().setTextAlign('center')}
//             className={editor.isActive({ textAlign: 'left' }) ? 'text-red-500' : ''}
//           >
//       <AlignCenter/>
//           </button>

//           <button
//           onClick={() => editor.chain().focus().setTextAlign('right')}
//             className={editor.isActive({ textAlign: 'left' }) ? 'text-red-500' : ''}
//           >
//       <AlignRight/>
//           </button>
          
//           <button
//             onClick={() => editor.chain().focus().toggleStrike().run()}
//             className={editor.isActive('strike') ? 'text-red-500' : ''}
//           >
//             <StrikethroughIcon/>
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleHighlight().run()}
//             className={editor.isActive('highlight') ? 'text-green-900' : ''}
//           >
//             <HighlighterIcon/>
//           </button>
        
//           <button
//             onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//             className={editor.isActive({ level: 1 }) ? 'is-active' : ''}
//           >
//             <Heading1/>
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//             className={editor.isActive({ level: 2 }) ? 'is-active' : ''}
//           >
//             <Heading2/>
//           </button>

//           <button
//           onClick={() => onAiClick()}
//             className={'hover:text-blue-600'}
//           >
//       <Sparkles/>
//           </button>
//           </div>
//       </div>
//     </div>
//   );
// }

// export default EditorExtension;


import {  Bold, Heading1, Heading2, Italic, Sparkles, StrikethroughIcon} from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';
import { useAction, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { chatSession } from '@/configs/AIModel';
import { toast } from 'sonner';

function EditorExtension({ editor }) {
  const { fileId } = useParams();
  const SearchAI = useAction(api.myAction.search);
  const saveNotes = useMutation(api.notes.AddNotes);

  const onAiClick = async () => {
    toast("AI is getting your answer...");
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    );
    console.log("selectedText", selectedText);

    const result = await SearchAI({
      query: selectedText,
      fileId: fileId
    });

    const UnformattedAns = JSON.parse(result);
    let AllUnformattedAns = '';
    UnformattedAns && UnformattedAns.forEach(item => {
      AllUnformattedAns = AllUnformattedAns + item.pageContent;
    });

    const PROMPT = "For question: " + selectedText + " and with the given content as answer, please give appropriate answer in HTML format. The answer content is: " + AllUnformattedAns;
    const AiModelResult = await chatSession.sendMessage(PROMPT);
    console.log(AiModelResult.response.text());
    const FinalAns = AiModelResult.response.text().replace('```', '').replace('html', '').replace('```', '');

    const AllText = editor.getHTML();
    editor.commands.setContent(AllText + '<p> <strong>Answer: </strong>' + FinalAns + ' </p>');

    saveNotes({
      notes: editor.getHTML(),
      fileId: fileId,
    });
  };

  if (!editor) {
    return null; // or some fallback UI, like a loading state
  }

  return (
    <div className="p-5">
      <div className="control-group">
        <div className="button-group flex gap-3">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'text-blue-500' : ''}
          >
            <Bold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'text-blue-500' : ''}
          >
            <Italic />
          </button>
          {/* <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'text-blue-500' : ''}
          >
            <Underline />
          </button> */}
          {/* <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'text-red-500' : ''}
          >
            AlignLeft 
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'text-red-500' : ''}
          >
            AlignCenter 
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'text-red-500' : ''}
          >
            AlignRight 
          </button> */}
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'text-red-500' : ''}
          >
            <StrikethroughIcon />
          </button>
          {/* <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'is-active' : { color: '#8ce99a' }}
          > 
            Toggle Highlight
          </button> */}
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive({ level: 1 }) ? 'is-active' : ''}
          >
            <Heading1 />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive({ level: 2 }) ? 'is-active' : ''}
          >
            <Heading2 />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
           ⋮≡
          </button>
          <button
            onClick={() => onAiClick()}
            className="hover:text-blue-600"
          >
            <Sparkles />
          </button>
        </div>
      </div>

    </div>
  );
}

export default EditorExtension;

 