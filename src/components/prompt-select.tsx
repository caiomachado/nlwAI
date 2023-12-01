import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { api } from "@/lib/axios";

interface Prompt {
    id: string;
    template: string;
    title: string;
}

type PromptSelectProps = {
    onPromptSelected: (template: string) => void
}

export function PromptSelect({ onPromptSelected }: PromptSelectProps) {
    const [prompts, setPrompts] = useState<Prompt[] | null>(null)

    function handlePromptSelected(promptId: string) {
        const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

        if (!selectedPrompt) return

        onPromptSelected(selectedPrompt.template)
    }

    useEffect(() => {
        api.get('/prompts').then((response) => {
            setPrompts(response.data)
        })
    }, [])

    return (
        <Select onValueChange={handlePromptSelected}>
            <SelectTrigger>
                <SelectValue placeholder="Select a prompt..." />
            </SelectTrigger>

            <SelectContent>
                {prompts && prompts.map(prompt => {
                    return (
                        <SelectItem key={prompt.id} value={prompt.id}>
                            {prompt.title}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}