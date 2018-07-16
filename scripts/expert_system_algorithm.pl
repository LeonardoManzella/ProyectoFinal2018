suggest(Actual_plan_context, Goals, Contributions, Identity_traits, Final_suggestions) :- 	 find_objetives_suggestions(Actual_plan_context, Goals, Goals_suggestions), find_contributions_suggestions(Actual_plan_context, Contributions, Contributions_suggestions), find_identity_suggestions(Actual_plan_context, Identity_traits, Identity_suggestions), find_mixed_suggestions(Actual_plan_context, Goals, Contributions, Identity_traits, Mixed_suggestions), append(Goals_suggestions, Contributions_suggestions, Pre_partial_suggestions), append(Pre_partial_suggestions, Identity_suggestions, Partial_suggestions), append(Partial_suggestions, Mixed_suggestions, Final_suggestions).

find_objetives_suggestions(Actual_plan_context, Goals, Goals_suggestions) :- findall( Suggestion, find_one_objetives_suggestion(Actual_plan_context, Goals, Suggestion),  Goals_suggestions).

find_one_objetives_suggestion(Actual_plan_context, Goals, Suggestion) :-  can_suggest(Actual_plan_context, Suggestion), member(Goal,Goals),  valid_objetives_rule(Goal,Suggestion).

find_contributions_suggestions(Actual_plan_context, Contributions, Contributions_suggestions) :- findall( Suggestion, find_one_contributions_suggestion(Actual_plan_context, Contributions, Suggestion),  Contributions_suggestions).

find_one_contributions_suggestion(Actual_plan_context, Contributions, Suggestion) :-  can_suggest(Actual_plan_context, Suggestion), member(Contribution,Contributions),  valid_contribution_rule(Contribution,Suggestion).

find_identity_suggestions(Actual_plan_context, Identity_traits, Identity_suggestions) :- findall( Suggestion, find_one_identity_suggestion(Actual_plan_context, Identity_traits, Suggestion),  Identity_suggestions).

find_one_identity_suggestion(Actual_plan_context, Identity_traits, Suggestion) :-  can_suggest(Actual_plan_context, Suggestion), member(Caracteristica_identidad,Identity_traits),  valid_identity_rule(Caracteristica_identidad,Suggestion).

find_mixed_suggestions(Actual_plan_context, Goals, Contributions, Identity_traits, Mixed_suggestions) :- append(Goals, Contributions, Pre_mixed_traits_list), append(Pre_mixed_traits_list, Identity_traits, Mixed_traits_list),  findall( Suggestion, find_one_mixed_suggestion(Actual_plan_context, Mixed_traits_list, Suggestion),  Mixed_suggestions). 

find_one_mixed_suggestion(Actual_plan_context, Mixed_traits_list, Suggestion) :-  can_suggest(Actual_plan_context, Suggestion), member(First_trait, Mixed_traits_list), member(Second_trait, Mixed_traits_list),  different(First_trait, Second_trait), regla_valida_combinacion(First_trait,Second_trait, Suggestion).

different(First_trait, Second_trait) :- not(First_trait == Second_trait) .


% RULES
% TODO translate to english
% TODO Test Added Rules using automated testing (needs cucumber)
can_suggest(commercial_plan, direct_marketing).
can_suggest(commercial_plan, logistic_association).
can_suggest(commercial_plan, international_contacts).

can_suggest(plan_empresarial, guardalos_para_urgencias_asi_estas_tranquilo).
can_suggest(plan_empresarial, contrata_secretaria).
can_suggest(plan_empresarial, usar_agenda_personal).
can_suggest(plan_empresarial, inverti_en_emprendimiento).
can_suggest(plan_empresarial, aduana_suppliers).

can_suggest(communication_plan, paid_ads).
can_suggest(communication_plan, local_social_networks).
can_suggest(communication_plan, digital_store).
can_suggest(communication_plan, physical_communications).
can_suggest(communication_plan, digital_communications).
can_suggest(communication_plan, talks_workshops).
can_suggest(communication_plan, ecommerce_association).
can_suggest(communication_plan, investors_deck_ready).
can_suggest(communication_plan, communication_association).
can_suggest(communication_plan, outsource_communications).
can_suggest(communication_plan, communicate_methodology).
can_suggest(communication_plan, care_about_design).

valid_objetives_rule(quiere_reconocimiento, direct_marketing).
valid_objetives_rule(quiere_reconocimiento, press_and_magazines).
valid_objetives_rule(quiere_reconocimiento, influencers).
valid_objetives_rule(quiere_reconocimiento, client_frequent_places).
valid_objetives_rule(quiere_reconocimiento, talks_workshops).
valid_objetives_rule(quiere_plata, endeudate).
valid_objetives_rule(quiere_plata, investors_deck_ready).
valid_objetives_rule(physical, aduana_suppliers).
valid_objetives_rule(global, international_contacts).
valid_objetives_rule(local, local_social_networks).
valid_objetives_rule(local, digital_store).
valid_objetives_rule(digital, local_social_networks).
valid_objetives_rule(digital, global_social_networks).
valid_objetives_rule(non_profit, direct_marketing).
valid_objetives_rule(non_profit, talks_workshops).
valid_objetives_rule(non_profit, local_social_networks).
valid_objetives_rule(young_client, local_social_networks).
valid_objetives_rule(young_client, global_social_networks).
valid_objetives_rule(adult_client, paid_ads).
valid_objetives_rule(adult_client, digital_store).
valid_objetives_rule(adult_client, communicate_methodology).
valid_objetives_rule(old_client, paid_ads).
valid_objetives_rule(old_client, digital_store).
valid_objetives_rule(old_client, communicate_methodology).

valid_contribution_rule(tiene_ahorros, inverti_en_emprendimiento).
valid_contribution_rule(tiene_ahorros, paid_ads).
valid_contribution_rule(tiene_ahorros, guardalos_para_urgencias_asi_estas_tranquilo).

valid_identity_rule(desorganizado, contrata_secretaria). 
valid_identity_rule(desorganizado, usa_agenda_personal).
valid_identity_rule(extrovert, direct_marketing).
valid_identity_rule(extrovert, talks_workshops).
valid_identity_rule(passion, direct_marketing).
valid_identity_rule(passion, talks_workshops).
valid_identity_rule(humorous, direct_marketing).
valid_identity_rule(humorous, talks_workshops).
valid_identity_rule(introvert, digital_communications).
valid_identity_rule(introvert, communication_association).
valid_identity_rule(introvert, outsource_communications).
valid_identity_rule(non_social, digital_communications).
valid_identity_rule(non_social, communication_association).
valid_identity_rule(non_social, outsource_communications).
valid_identity_rule(creative, digital_communications).
valid_identity_rule(creative, local_social_networks).
valid_identity_rule(creative, global_social_networks).
valid_identity_rule(class_and_style, paid_ads).
valid_identity_rule(class_and_style, digital_store).
valid_identity_rule(class_and_style, communicate_methodology).
valid_identity_rule(class_and_style, care_about_design).
valid_identity_rule(shy_and_afraid, care_about_design).
valid_identity_rule(organized, paid_ads).
valid_identity_rule(organized, digital_store).
valid_identity_rule(organized, communicate_methodology).
valid_identity_rule(_, communication_association). %TODO check _ is for anyone


regla_valida_combinacion(local, physical, physical_communications).
regla_valida_combinacion(local, physical, press_and_magazines).
regla_valida_combinacion(local, physical, influencers).
regla_valida_combinacion(local, physical, client_frequent_places).
regla_valida_combinacion(global, digital, digital_store).
regla_valida_combinacion(global, digital, talks_workshops).
regla_valida_combinacion(global, digital, digital_communications).
regla_valida_combinacion(global, physical, logistic_association).
regla_valida_combinacion(global, physical, ecommerce_association).


/* Replace For Testing Purposes
can_suggest(plan_empresarial, endeudate).
can_suggest(plan_empresarial, otra_sugerencia).
can_suggest(plan_comercial, mostrate).
can_suggest(plan_empresarial, inverti_en_emprendimiento).
can_suggest(plan_empresarial, guardalos_para_urgencias_asi_estas_tranquilo).
can_suggest(plan_empresarial, contrata_secretaria).
can_suggest(plan_empresarial, usar_agenda_personal).
can_suggest(plan_empresarial, funciono_combinada_diferentes_categorias).
can_suggest(plan_empresarial, funciono_combinada_misma_categoria).
valid_objetives_rule(quiere_reconocimiento, mostrate).
valid_objetives_rule(quiere_plata, endeudate).
valid_objetives_rule(quiere_plata, error_no_debe_aparecer). % Para pruebas
valid_contribution_rule(tiene_ahorros, inverti_en_emprendimiento).
valid_contribution_rule(tiene_ahorros, guardalos_para_urgencias_asi_estas_tranquilo).
valid_identity_rule(desorganizado, contrata_secretaria). 
valid_identity_rule(desorganizado, usa_agenda_personal).
valid_identity_rule(desorganizado, error_no_debe_aparecer). % Para pruebas
regla_valida_combinacion(tiene_ahorros, desorganizado, funciono_combinada_diferentes_categorias).
regla_valida_combinacion(quiere_plata, quiere_reconocimiento, funciono_combinada_misma_categoria).
regla_valida_combinacion(tiene_ahorros, desorganizado, error_no_debe_aparecer). % Para pruebas
*/
/* 
Para Probar suggest(plan_empresarial, [quiere_plata, quiere_reconocimiento], [tiene_ahorros], [desorganizado], Final_suggestions).
Otra prueba suggest(plan_comercial, [quiere_plata, quiere_reconocimiento], [tiene_ahorros], [desorganizado], Final_suggestions).
Ejecutar en https://tio.run/##xVhtb9o6GP18@RWRpknd1C00QGknTeIdSigJhPLSqykyiUkMSRxsh7c/35mWUsIIDW1377fI@Dnn8TnHL61PsIOtb3SOHh4@Cx2lpAgdAjzqAAYFhgXoWQ6idoIGFiSInBWxx@CCYd13gKcDgwXAOReU4RgyNMP0XMj7mDDIP4qA8J95EWXIAFRHJvQYMoF5LmhrMOgZiA@PkAecL8KPb8I/nMzg8AQQne7MwM/gr5Nrh8q@nEcAg6dWI2C3C9H@LImE3C4yAjSmKNvhSCIDu0OunAnox1vygs3pge9Dzzw7qOxBbcKDPoG6Dwj/dmAEXGhKhA57oK8AHgZ7WdahBH5PJP5S/NbZ5hwmcJyznSm7zgYe2OF8GyXXIqKB0NI@hGq9JMEPoAn1zcFAYQRAqEEXukNIzp5Bz5WdPSoQaDlAnwGHG77T13byDlKkWe/Y0qfbdDLZvkXP1McMOp3kneY8QZ7ntydd2JjnfjbT4pjy4Yfi6VZ9SAv79r00dMzAj6F@p6lhkh2OSPY/jN9ZRxRYnDD8RxfXWq/N1XAIsMGRwOPNc@iyO/Tr0SaeCraT19qdls9taYQoewTHUrmzoO/CkVy@h/KdaVQJciHRjZCgh1TczNegFXA1YxQIJhqN1nwsiuQwFi8NhX2DaSDsRQBF9RTeA29tZy2whyOqhJ8/I@s4Z@KzUCsXa4qW2Hfo0Rjo8mBTQNDaHZ52GJj8rc@bfX025jnaiVBUDRcPPr7AuIGY8pqY8MibQcKQDjfjnolcxLXDsaqtABC@4/Dj@w/oAbGeb1nKIXlQqM5b8aYBcuIBPu0bHjAKDQLZejRWXcA/dMDZuT0@JBQ/PS9fLxwF3jpw@CXROs/PY3wg39dcRgvzmfStYC6iLnjB4TARTy6uEWfVCeQSYGNjQsjM44W8GwbC4YpXQAgmOu/ZhEPIXxqAdwAJP8Y@Cyr3VPBJAIeAJg4@SBjvkhfZmIPQ42GKU39inCKuShNSTCzgoRUwcUSkhJjFPFcHYhWv9k3K7h6Ce@rswZ@Q3EiGcBQiInh6quMvIq5G4lch8TigEjwERHj@18ife/DfGGv6xaeF@loPhDr7dfjPVYVtewq3sHP8/tUGymNoBDzDfJ8LNmM@/SGKDOHvJPDET59It93s5G7n5VKq01@V@35lINdK42Bodk3UpWo2L9mgeqP2NbU2Ebs1qyuqYyfQlEa7XYb1VnNYG8FVc6ayeoaR5XWRim5WkyaNvjd2JCZNuml0kbmodC8VudhLVtwcqGPmLKZKwVusLjVVXrWX2V6rNW7JLSmZDHpW8tIiAbWtzD3spJMdlJRFe1FoG1Z72ZglTWi3avnZaJxN01HpYuBVMsZdJuXfStMSzHfFpncl0cKons/1cKdn38NxWc6VCspwWXSdaX@yaM3naSWveI3LVs2epK78hYEsMT@46VoByvt2aljrO3XRYY07H7XgJCg0K9Os3WzkqmVRk916rgG1qeVPynUGcvWuJhUqSdQZ9bM0D0D53ppIlcZwUhElzHqW56sp1ugOstclOV24z5Rgoai156xBIZrRmeTdYPGmE@Tnl1qxvgrEJSsryWzrqggsV1VWfTpe3sn3bVHLNlFeKsnyxSBTq6aMmbXK1roTz6xju1y1k7hhs4Kcv1UuJlqnX1oZd9fVfq@YyY4MX53ngutgmppdw5SbnVUW0nAGkwuWSbrSCraraHEtV1Gzbl5djnsDsHDLqr1SO35/JReXnduu0SaTu3RrtvAqBpD8mx5PbqXm2WNTdAarUao@YoXU9NZuZ7vynavQaqo1zYtK5Qq3MulbtV7K2WLiq/jw8P9swd8
*/