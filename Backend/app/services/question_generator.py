from concurrent.futures import ThreadPoolExecutor
import tqdm

# Generate questions in parallel to speed up the process
def generate_questions_parallel(base, query, question_type, question_nbr, ollama_model, difficulty):
    def generate_question(content):
        if question_type.lower() == "mcq":
            return {
                "type": "mcq",
                "source_content": content,
                "question_data": generate_mcq(content, query, ollama_model, difficulty)
            }
        elif question_type.lower() == "open-ended":
            return {
                "type": "open-ended",
                "source_content": content,
                "question_data": generate_open_ended(content, query, ollama_model, difficulty)
            }
        else:
            raise ValueError("Invalid question type. Use 'mcq' or 'open-ended'.")

    with ThreadPoolExecutor() as executor:
        questions = list(
            tqdm.tqdm(
                executor.map(generate_question, base[:question_nbr]),
                total=question_nbr,
                desc="Generating Questions"
            )
        )
    return questions


# Generate QCM questions
def generate_mcq(content, query, ollama_model, difficulty="intermédiaire"):
    prompt = f"""
    Agis comme un système expert en génération de questions à choix multiples (QCM) en français. 
    Génère une question de niveau {difficulty} strictement basée sur le contenu fourni ci-dessous, en respectant les consignes suivantes :
    
    1. **Lien avec la requête** : La question doit être directement liée au concept suivant : '{query}'.
    2. **Contexte nécessaire** : Si la question nécessite un contexte supplémentaire (exemple, explication ou code), inclure ce contexte dans la formulation de la question.
    3. **Adhérence au contenu** : Toutes les informations dans la question, les options et les explications doivent provenir exclusivement du contenu fourni. Évite tout ajout inutile ou non fondé.
    4. **Structure stricte** : 
        - Une question pertinente et bien formulée.
        - Quatre options de réponse (A, B, C, D), avec une option correcte.
        - Si nécessaire, inclure une option indiquant que toutes les réponses sont correctes ou qu’aucune n’est correcte.
        - Une seule réponse correcte clairement identifiée.
        - Une explication concise en français expliquant pourquoi la réponse correcte est valide, sans référencer directement le contenu source.
    5. **Format JSON obligatoire** : Respecter strictement le format suivant pour la sortie :

    ```json
    {{
        "question": "<la question>",
        "options": {{
            "A": "<option A>",
            "B": "<option B>",
            "C": "<option C>",
            "D": "<option D>"
        }},
        "correct_answer": "<la réponse correcte>",
        "explanation": "<explication concise>"
    }}
    ```

    **Note importante** : Si toutes les options sont valides ou aucune ne l'est, cela doit être clairement indiqué dans les options et dans l'explication.

    Contenu à utiliser pour générer la question :
    {content}
    """
    response = ollama_model.invoke(prompt)
    return response



# Generate open-ended questions
def generate_open_ended(content, query, ollama_model, difficulty="intermédiaire"):

    prompt = f"""
    Agis comme un système français spécialisé dans la génération de questions ouvertes. 
    Génère une question ouverte de niveau {difficulty} en français basée sur le contenu suivant.
    La question doit se concentrer sur le concept de '{query}' et tester la compréhension de ce concept dans le contexte du contenu.

    La sortie doit inclure uniquement :
    1. Une question claire et bien structurée
    2. Une réponse exemple concise
    3. Une explication en français de la réponse, sans faire référence au contenu source.

    Contenu :
    {content}
    """
    response = ollama_model.invoke(prompt)
    return response
