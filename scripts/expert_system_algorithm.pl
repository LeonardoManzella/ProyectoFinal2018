% TODO Translate to english
sugerir(Contexto_plan_actual, Objetivos, Aportes, Caracteristicas_identidad, Sugerencias_final) :- 	 encontrar_sugerencias_objetivos(Contexto_plan_actual, Objetivos, Sugerencias_objetivos), encontrar_sugerencias_aportes(Contexto_plan_actual, Aportes, Sugerencias_aportes), encontrar_sugerencias_identidad(Contexto_plan_actual, Caracteristicas_identidad, Sugerencias_identidad), encontrar_sugerencias_combinadas(Contexto_plan_actual, Objetivos, Aportes, Caracteristicas_identidad, Sugerencias_combinadas), append(Sugerencias_objetivos, Sugerencias_aportes, Sugerencias_pre_parciales), append(Sugerencias_pre_parciales, Sugerencias_identidad, Sugerencias_parciales), append(Sugerencias_parciales, Sugerencias_combinadas, Sugerencias_final).

encontrar_sugerencias_objetivos(Contexto_plan_actual, Objetivos, Sugerencias_objetivos) :- findall( Sugerencia, encontrar_una_sugerencia_objetivos(Contexto_plan_actual, Objetivos, Sugerencia),  Sugerencias_objetivos).

encontrar_una_sugerencia_objetivos(Contexto_plan_actual, Objetivos, Sugerencia) :-  puede_sugerirse(Contexto_plan_actual, Sugerencia), member(Objetivo,Objetivos),  regla_valida_objetivos(Objetivo,Sugerencia).

encontrar_sugerencias_aportes(Contexto_plan_actual, Aportes, Sugerencias_aportes) :- findall( Sugerencia, encontrar_una_sugerencia_aportes(Contexto_plan_actual, Aportes, Sugerencia),  Sugerencias_aportes).

encontrar_una_sugerencia_aportes(Contexto_plan_actual, Aportes, Sugerencia) :-  puede_sugerirse(Contexto_plan_actual, Sugerencia), member(Aporte,Aportes),  regla_valida_aportes(Aporte,Sugerencia).

encontrar_sugerencias_identidad(Contexto_plan_actual, Caracteristicas_identidad, Sugerencias_identidad) :- findall( Sugerencia, encontrar_una_sugerencia_identidad(Contexto_plan_actual, Caracteristicas_identidad, Sugerencia),  Sugerencias_identidad).

encontrar_una_sugerencia_identidad(Contexto_plan_actual, Caracteristicas_identidad, Sugerencia) :-  puede_sugerirse(Contexto_plan_actual, Sugerencia), member(Caracteristica_identidad,Caracteristicas_identidad),  regla_valida_identidad(Caracteristica_identidad,Sugerencia).

encontrar_sugerencias_combinadas(Contexto_plan_actual, Objetivos, Aportes, Caracteristicas_identidad, Sugerencias_combinadas) :- append(Objetivos, Aportes, Lista_pre_combinadas), append(Lista_pre_combinadas, Caracteristicas_identidad, Lista_combinada),  findall( Sugerencia, encontrar_una_sugerencia_combinada(Contexto_plan_actual, Lista_combinada, Sugerencia),  Sugerencias_combinadas). 

encontrar_una_sugerencia_combinada(Contexto_plan_actual, Lista_combinada, Sugerencia) :-  puede_sugerirse(Contexto_plan_actual, Sugerencia), member(Primer_caracteristica, Lista_combinada), member(Segunda_caracteristica, Lista_combinada),  different(Primer_caracteristica, Segunda_caracteristica), regla_valida_combinacion(Primer_caracteristica,Segunda_caracteristica, Sugerencia).

different(Primer_caracteristica, Segunda_caracteristica) :- not(Primer_caracteristica == Segunda_caracteristica) .


% HECHOS
puede_sugerirse(plan_empresarial, endeudate).
puede_sugerirse(plan_empresarial, otra_sugerencia).
puede_sugerirse(plan_comercial, mostrate).
puede_sugerirse(plan_empresarial, inverti_en_emprendimiento).
puede_sugerirse(plan_empresarial, guardalos_para_urgencias_asi_estas_tranquilo).
puede_sugerirse(plan_empresarial, contrata_secretaria).
puede_sugerirse(plan_empresarial, usar_agenda_personal).
puede_sugerirse(plan_empresarial, funciono_combinada_diferentes_categorias).
puede_sugerirse(plan_empresarial, funciono_combinada_misma_categoria).
regla_valida_objetivos(quiere_reconocimiento, mostrate).
regla_valida_objetivos(quiere_plata, endeudate).
regla_valida_objetivos(quiere_plata, error_no_debe_aparecer). % Para pruebas
regla_valida_aportes(tiene_ahorros, inverti_en_emprendimiento).
regla_valida_aportes(tiene_ahorros, guardalos_para_urgencias_asi_estas_tranquilo).
regla_valida_identidad(desorganizado, contrata_secretaria). 
regla_valida_identidad(desorganizado, usa_agenda_personal).
regla_valida_identidad(desorganizado, error_no_debe_aparecer). % Para pruebas
regla_valida_combinacion(tiene_ahorros, desorganizado, funciono_combinada_diferentes_categorias).
regla_valida_combinacion(quiere_plata, quiere_reconocimiento, funciono_combinada_misma_categoria).
regla_valida_combinacion(tiene_ahorros, desorganizado, error_no_debe_aparecer). % Para pruebas
/* 
Para Probar sugerir(plan_empresarial, [quiere_plata, quiere_reconocimiento], [tiene_ahorros], [desorganizado], Sugerencias_final).
Otra prueba sugerir(plan_comercial, [quiere_plata, quiere_reconocimiento], [tiene_ahorros], [desorganizado], Sugerencias_final).
Ejecutar en https://tio.run/##rVRNT@MwED3TXzEXpFYKHDjubdVdiVsP7A2haGIPXSPHk/VHgV/PjluSOLRREeJQNbHfezNvPtJ5try9Cs/m7S2kLXnjl2t2kV4i151FV6OKCW0Fm@aJotlxqOBnxz6SPKzRy7WQQjQKQ200uWg06grushg5ZeT40Ti0K/hxBRcgRyLv0dehQHAvfj74sfD1YnF5cU53pM2qDeAV/Nn82sBfJA@WoTWhZejEK@DBObyCmlqXkxQww4OAOnL6QHhk38pxcig/AYIVguiAph3bHXlJ/ltLUpiQekuBNFq7hNL@GE/SKmJ@LeSqgpkEJta@JVS2BF0iTfX7sAaaEZgk2FLbkF/2otWgnpP3tLVY79DK4BZ5DeBCSRwtLseivsv2nIo/ITuAw6SCJzu/ytEO07Q8CagmPOzXsjyUKZR/S7NiA2DKK1Y5HG3cvgz7HVkndJohEGh0oLhtBKAMO1kSTXDzcU9GXWC57fcpPw@u9uq3v9e3m7vFx2bve0xt50m2zeRGix9KGiNJd86jWYaxmEPhzPTpXzKCyTMVcRrkU4QvxnFca2pIWomeFHnhjd/lYzf3JftB3qMhR7VKUmOsG3QqA/OF8oQ54MPJD@h/
*/