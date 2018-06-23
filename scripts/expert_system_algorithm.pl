sugerir(Contexto_plan_actual, Objetivos, Aportes, Caracteristicas_identidad, Sugerencias_final) :- 	 encontrar_sugerencias_objetivos(Contexto_plan_actual, Objetivos, Sugerencias_final).

%	encontrar_sugerencias_objetivos(Sugerencia, Objetivos, Sugerencias_objetivos) TODO haer lo mismo para aportes y caracteristicas y usar los append para formar una unica lista a devolver.

encontrar_sugerencias_objetivos(Contexto_plan_actual, Objetivos, Sugerencias_objetivos) :- findall( Sugerencia, encontrar_una_sugerencia_objetivos(Contexto_plan_actual, Objetivos, Sugerencia),  Sugerencias_objetivos).

encontrar_una_sugerencia_objetivos(Contexto_plan_actual, Objetivos, Sugerencia) :-  puede_sugerirse(Contexto_plan_actual, Sugerencia), member(Objetivo,Objetivos),  regla_valida_objetivos(Objetivo,Sugerencia).


% findall( member(objetivo,objetivos),  regla_valida_objetivos(objetivo,sugerencia),  sugerencias_objetivos)

% append(sugerencias_objetivos, sugerencias_aportes, sugerencias_parciales)

% append(sugerencias_parciales, sugerencias_identidad, sugerencias_final)


% TODO Cuando se dan combinaciones de 2 caracteristicas_identidad o 2 aportes o 2 objetivos
% TODO Cuando se dan combinaciones de 2 cosa distintas, 1 caracteristicas_identidad con 1 aportes, 1 aportes con 1 objetivos

% HECHOS
puede_sugerirse(plan_empresarial, endeudate).
puede_sugerirse(plan_empresarial, otra_sugerencia).
regla_valida_objetivos(quiere_plata, endeudate).
regla_valida_objetivos(quiere_plata, otra_sugerencia).
regla_valida_objetivos(quiere_plata, no_debe_aparecer). % Para pruebas
% Para Probar sugerir(plan_empresarial, [quiere_plata], [tiene_cuenta_bancaria], [creativo], Sugerencias_final).
% Ejecutar en https://tio.run/##rVRNT@MwED3TXzEXpFYKHDjubdVdiVsP7A2haGIPXSPHk/VHgV/PjluSOLRREeJQNbHfezNvPtJ5try9Cs/m7S2kLXnjl2t2kV4i151FV6OKCW0Fm@aJotlxqOBnxz6SPKzRy7WQQjQKQ200uWg06grushg5ZeT40Ti0K/hxBRcgRyLv0dehQHAvfj74sfD1YnF5cU53pM2qDeAV/Nn82sBfJA@WoTWhZejEK@DBObyCmlqXkxQww4OAOnL6QHhk38pxcig/AYIVguiAph3bHXlJ/ltLUpiQekuBNFq7hNL@GE/SKmJ@LeSqgpkEJta@JVS2BF0iTfX7sAaaEZgk2FLbkF/2otWgnpP3tLVY79DK4BZ5DeBCSRwtLseivsv2nIo/ITuAw6SCJzu/ytEO07Q8CagmPOzXsjyUKZR/S7NiA2DKK1Y5HG3cvgz7HVkndJohEGh0oLhtBKAMO1kSTXDzcU9GXWC57fcpPw@u9uq3v9e3m7vFx2bve0xt50m2zeRGix9KGiNJd86jWYaxmEPhzPTpXzKCyTMVcRrkU4QvxnFca2pIWomeFHnhjd/lYzf3JftB3qMhR7VKUmOsG3QqA/OF8oQ54MPJD@h/