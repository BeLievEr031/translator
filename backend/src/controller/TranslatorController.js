const { Translate } = require('@google-cloud/translate').v2;
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const fs = require('fs');
const path = require('path');
const util = require('util');
const translateClient = new Translate();
const textToSpeechClient = new TextToSpeechClient();

class TranslatorController {
    async translateAndSynthesizeSpeech(req, res, next) {
        const { userId, text, sourceLanguage, targetLanguage } = req.body;
        console.log(userId, text, sourceLanguage, targetLanguage);

        const [translation] = await translateClient.translate(text, targetLanguage);
        console.log(`Translated Text: ${translation}`);
        const requestSource = {
            input: { text },
            voice: { languageCode: sourceLanguage, ssmlGender: 'NEUTRAL' },
            audioConfig: { audioEncoding: 'MP3' },
        };

        const requestTarget = {
            input: { text: translation },
            voice: { languageCode: "hi", ssmlGender: 'NEUTRAL' },
            audioConfig: { audioEncoding: 'MP3' },
        };

        try {
            const [responseSource] = await textToSpeechClient.synthesizeSpeech(requestSource);
            const writeFile = util.promisify(fs.writeFile);
            // const sourceAudioLocation = path.join(__dirname, `../../audio/${userId}_source_audio.mp3`)
            // console.log(sourceAudioLocation);

            // await writeFile(sourceAudioLocation, responseSource.audioContent, 'binary');
            // console.log('Audio content written to file: source_audio.mp3');

            const [responseTarget] = await textToSpeechClient.synthesizeSpeech(requestTarget);
            // const translatedAudioLocation = path.join(__dirname, `../../audio/${userId}_translated_audio.mp3`)
            // await writeFile(translatedAudioLocation, responseTarget.audioContent, 'binary');
            console.log('Audio content written to file: translated_audio.mp3');
            // const sourceAudioBase64 = responseSource.audioContent.toString('base64');
            res.json({
                success: true,
                message: 'Translation and synthesis completed successfully',
                data: {
                    userId,
                    originalText: text,
                    translatedText: translation,
                    sourceLanguage,
                    targetLanguage,
                    sourceAudio: {
                        // filePath: sourceAudioLocation,
                        base64: `data:audio/mp3;base64,${responseSource.audioContent.toString('base64')}`
                        , // Optionally include Base64
                    },
                    translatedAudio: {
                        // filePath: translatedAudioLocation,
                        base64: `data:audio/mp3;base64,${responseTarget.audioContent.toString('base64')}`, // Optionally include Base64
                    },
                },
            });
        } catch (error) {
            console.error('Error synthesizing speech:', error);
        }
    }
}

module.exports = TranslatorController;