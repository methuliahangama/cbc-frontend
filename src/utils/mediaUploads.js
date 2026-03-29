import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzaGhic296cG91amZleG13aWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MTAwNDQsImV4cCI6MjA5MDA4NjA0NH0.zBTibhnojciAsLedit-Zsy2Tn8v6dV9ZIr9ln09b4Q4`
const url = "https://dshhbsozpoujfexmwicx.supabase.co"

const supabase = createClient(url, key);

export default function uploadMediaToSupabase(file) {
    return new Promise((resolve, reject) => {
        if (file == null) {
            reject("Please select a file to upload.");
        }
        let fileName = file.name;
        const extension = fileName.split(".")[fileName.split(".").length - 1];

        

        const timestamp = new Date().getTime();
        fileName = timestamp +file.name+ "-" + extension;

        supabase.storage.from("images").upload(fileName, file, {
            cacheControl: "3600",
            upsert: false
        }).then(()=>{
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl);
        }).catch((err) =>{
                reject(err);
        });
    });
}







