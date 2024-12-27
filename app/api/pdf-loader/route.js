import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
// const pdfUrl="https://secret-cricket-740.convex.cloud/api/storage/ac82dcf9-b0d7-49dc-b3cf-3689f3a09682"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function GET(req) {

    const reqUrl=req.url;
    const {searchParams}=new URL(reqUrl);
    const pdfUrl=searchParams.get('pdfUrl')
    console.log(pdfUrl);
    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader=new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent='';
    docs.forEach(doc=>{
        pdfTextContent=pdfTextContent+doc.pageContent;
    })

    const splitter = new RecursiveCharacterTextSplitter({

        chunkSize: 100,
        chunkOverlap: 20
    });
    const output = await splitter.createDocuments([pdfTextContent]);

    let splitterList=[];
    output.forEach(doc=>{
        splitterList.push(doc.pageContent);
    })
    return NextResponse.json({result:'splitterList'});
}

