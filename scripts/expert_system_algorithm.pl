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
% TODO Revisar que las sugerencias de todas las reglas esten almenos en uno de los planes, asi no olvide agregarlas ahi
can_suggest(commercial_plan, direct_marketing).
can_suggest(commercial_plan, logistic_association).
can_suggest(commercial_plan, international_contacts).
can_suggest(commercial_plan, outsource_sales).
can_suggest(commercial_plan, start_selling_followers).
can_suggest(commercial_plan, talks_workshops).
can_suggest(commercial_plan, trade_show).
can_suggest(commercial_plan, embassy_association).
can_suggest(commercial_plan, international_association).
can_suggest(commercial_plan, brand_association).
can_suggest(commercial_plan, politic_mayor_association).
can_suggest(commercial_plan, influencers).
can_suggest(commercial_plan, hire_business_manager).
can_suggest(commercial_plan, work_near_clients).
can_suggest(commercial_plan, use_CRM).
can_suggest(commercial_plan, meetings).
can_suggest(commercial_plan, samples).
can_suggest(commercial_plan, target_massive_markets).
can_suggest(commercial_plan, carefull_deadlines).
can_suggest(commercial_plan, sell_talks).
can_suggest(commercial_plan, sell_workshops).
can_suggest(commercial_plan, logistics).

can_suggest(plan_empresarial, guardalos_para_urgencias_asi_estas_tranquilo).
can_suggest(plan_empresarial, hire_secretary).
can_suggest(plan_empresarial, usar_agenda_personal).
can_suggest(plan_empresarial, disconnect).
can_suggest(plan_empresarial, find_partner_for_support).
can_suggest(plan_empresarial, plan_breaks).
can_suggest(plan_empresarial, inverti_en_emprendimiento).
can_suggest(plan_empresarial, aduana_suppliers).
can_suggest(plan_empresarial, known_partner_divide_roles).
can_suggest(plan_empresarial, outsource_control).
can_suggest(plan_empresarial, systematize).
can_suggest(plan_empresarial, assign_roles).
can_suggest(plan_empresarial, weekly_meetings).
can_suggest(plan_empresarial, define_billing_process).
can_suggest(plan_empresarial, therapy).
can_suggest(plan_empresarial, do_sport).
can_suggest(plan_empresarial, keep_yourself_busy).
can_suggest(plan_empresarial, talk_partner_objetives).
can_suggest(plan_empresarial, carefull_deferred_payment).
can_suggest(plan_empresarial, cross_control).
can_suggest(plan_empresarial, design_processes).
can_suggest(plan_empresarial, monitor_employees).
can_suggest(plan_empresarial, explain_how_to_delegate).
can_suggest(plan_empresarial, consultant_or_coach).
can_suggest(plan_empresarial, hire_experienced_employees).
can_suggest(plan_empresarial, organize_billing).
can_suggest(plan_empresarial, arrange_bank_loans).
can_suggest(plan_empresarial, arrange_passport).
can_suggest(plan_empresarial, take_time_communicate).
can_suggest(plan_empresarial, talk_directly_about_problems).
can_suggest(plan_empresarial, relaxing_decorations).
can_suggest(plan_empresarial, digital_payments).
can_suggest(plan_empresarial, local_payments).
can_suggest(plan_empresarial, update_netbook).
can_suggest(plan_empresarial, everything_online).
can_suggest(plan_empresarial, outsource_accounting).

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
can_suggest(communication_plan, influencers).
can_suggest(communication_plan, use_achievements_branding).
can_suggest(communication_plan, guerrilla_marketing).

valid_objetives_rule(quiere_reconocimiento, direct_marketing).
valid_objetives_rule(quiere_reconocimiento, press_and_magazines).
valid_objetives_rule(quiere_reconocimiento, influencers).
valid_objetives_rule(quiere_reconocimiento, client_frequent_places).
valid_objetives_rule(quiere_reconocimiento, talks_workshops).
valid_objetives_rule(quiere_plata, endeudate).
valid_objetives_rule(quiere_plata, investors_deck_ready).
valid_objetives_rule(quiere_plata, target_massive_markets).
valid_objetives_rule(travel, trade_show).
valid_objetives_rule(travel, international_contacts).
valid_objetives_rule(travel, update_netbook).
valid_objetives_rule(travel, everything_online).
valid_objetives_rule(travel, digital_payments).
valid_objetives_rule(have_fun, trade_show).
valid_objetives_rule(physical, aduana_suppliers).
valid_objetives_rule(physical, samples).
valid_objetives_rule(physical, logistic_association).
valid_objetives_rule(physical, logistics).
valid_objetives_rule(physical, carefull_deferred_payment).
valid_objetives_rule(global, international_contacts).
valid_objetives_rule(global, digital_payments).
valid_objetives_rule(global, everything_online).
valid_objetives_rule(local, local_social_networks).
valid_objetives_rule(local, digital_store).
valid_objetives_rule(local, local_payments).
valid_objetives_rule(digital, local_social_networks).
valid_objetives_rule(digital, global_social_networks).
valid_objetives_rule(digital, target_massive_markets).
valid_objetives_rule(digital, digital_payments).
valid_objetives_rule(product_and_service, local_social_networks).
valid_objetives_rule(product_and_service, local_social_networks).
valid_objetives_rule(product_and_service, press).
valid_objetives_rule(doesnt_know, local_social_networks).
valid_objetives_rule(doesnt_know, local_social_networks).
valid_objetives_rule(doesnt_know, press).
valid_objetives_rule(non_profit, direct_marketing).
valid_objetives_rule(non_profit, talks_workshops).
valid_objetives_rule(non_profit, local_social_networks).
valid_objetives_rule(non_profit, everything_online).
valid_objetives_rule(young_client, local_social_networks).
valid_objetives_rule(young_client, global_social_networks).
valid_objetives_rule(adult_client, paid_ads).
valid_objetives_rule(adult_client, digital_store).
valid_objetives_rule(adult_client, communicate_methodology).
valid_objetives_rule(old_client, paid_ads).
valid_objetives_rule(old_client, digital_store).
valid_objetives_rule(old_client, communicate_methodology).
valid_objetives_rule(alone, outsource_communications).
valid_objetives_rule(alone, outsource_sales).
valid_objetives_rule(alone, outsource_control).
valid_objetives_rule(alone, hire_business_manager).
valid_objetives_rule(alone, find_partner_for_support).
valid_objetives_rule(alone, update_netbook).
valid_objetives_rule(has_partner, known_partner_divide_roles).
valid_objetives_rule(has_partner, talk_partner_objetives).
valid_objetives_rule(allow_association, brand_association).
valid_objetives_rule(allow_association, politic_mayor_association).
valid_objetives_rule(allow_association, influencers).
valid_objetives_rule(allow_association, communication_association).
valid_objetives_rule(allow_association, everything_online).
valid_objetives_rule(allow_sell_talks, talks_workshops).
valid_objetives_rule(allow_sell_talks, sell_talks).
valid_objetives_rule(allow_sell_talks, update_netbook).
valid_objetives_rule(allow_sell_workshops, talks_workshops).
valid_objetives_rule(allow_sell_workshops, sell_workshops).
valid_objetives_rule(allow_sell_workshops, update_netbook).
valid_objetives_rule(strengthen_your_team, consultant_or_coach).
valid_objetives_rule(flexibility, update_netbook).
valid_objetives_rule(flexibility, everything_online).

valid_contribution_rule(has_savings_or_funding, inverti_en_emprendimiento).
valid_contribution_rule(has_savings_or_funding, paid_ads).
valid_contribution_rule(has_savings_or_funding, guardalos_para_urgencias_asi_estas_tranquilo).
valid_contribution_rule(has_followers, start_selling_followers).
valid_contribution_rule(has_achievements, use_achievements_branding).
valid_contribution_rule(doesnt_have_account, define_billing_process).
valid_contribution_rule(doesnt_have_account, organize_billing).
valid_contribution_rule(doesnt_have_account, arrange_bank_loans).
valid_contribution_rule(doesnt_have_credit_history, arrange_bank_loans).
valid_contribution_rule(doesnt_have_passport, arrange_passport).

valid_identity_rule(desorganizado, hire_secretary). 
valid_identity_rule(desorganizado, personal_agenda). 
valid_identity_rule(desorganizado, disconnect). 
valid_identity_rule(desorganizado, find_partner_for_support). 
valid_identity_rule(desorganizado, plan_breaks). 
valid_identity_rule(desorganizado, carefull_deadlines).
valid_identity_rule(extrovert, direct_marketing).
valid_identity_rule(extrovert, contacts).
valid_identity_rule(extrovert, talks_workshops).
valid_identity_rule(extrovert, trade_show).
valid_identity_rule(social, direct_marketing).
valid_identity_rule(social, contacts).
valid_identity_rule(social, talks_workshops).
valid_identity_rule(social, trade_show).
valid_identity_rule(passion, direct_marketing).
valid_identity_rule(passion, talks_workshops).
valid_identity_rule(passion, trade_show).
valid_identity_rule(humorous, direct_marketing).
valid_identity_rule(humorous, talks_workshops).
valid_identity_rule(introvert, digital_communications).
valid_identity_rule(introvert, communication_association).
valid_identity_rule(introvert, outsource_communications).
valid_identity_rule(introvert, outsource_sales).
valid_identity_rule(non_social, digital_communications).
valid_identity_rule(non_social, communication_association).
valid_identity_rule(non_social, outsource_communications).
valid_identity_rule(non_social, outsource_sales).
valid_identity_rule(non_social, take_time_communicate).
valid_identity_rule(non_social, talk_directly_about_problems).
valid_identity_rule(non_social, relaxing_decorations).
valid_identity_rule(creative, digital_communications).
valid_identity_rule(creative, local_social_networks).
valid_identity_rule(creative, global_social_networks).
valid_identity_rule(class_and_style, paid_ads).
valid_identity_rule(class_and_style, digital_store).
valid_identity_rule(class_and_style, communicate_methodology).
valid_identity_rule(class_and_style, care_about_design).
valid_identity_rule(class_and_style, meetings).
valid_identity_rule(shy_and_afraid, care_about_design).
valid_identity_rule(shy_and_afraid, therapy).
valid_identity_rule(shy_and_afraid, keep_yourself_busy).
valid_identity_rule(shy_and_afraid, outsource_communications).
valid_identity_rule(shy_and_afraid, outsource_sales).
valid_identity_rule(shy_and_afraid, find_partner_for_support).
valid_identity_rule(shy_and_afraid, relaxing_decorations).
valid_identity_rule(shy_and_afraid, talk_directly_about_problems).
valid_identity_rule(stressfully, therapy).
valid_identity_rule(stressfully, do_sport).
valid_identity_rule(stressfully, outsource_communications).
valid_identity_rule(stressfully, outsource_sales).
valid_identity_rule(stressfully, find_partner_for_support).
valid_identity_rule(stressfully, relaxing_decorations).
valid_identity_rule(stressfully, talk_directly_about_problems).
valid_identity_rule(stressfully, update_netbook).
valid_identity_rule(anxious, do_sport).
valid_identity_rule(anxious, therapy).
valid_identity_rule(anxious, keep_yourself_busy).
valid_identity_rule(anxious, relaxing_decorations).
valid_identity_rule(anxious, talk_directly_about_problems).
valid_identity_rule(anxious, update_netbook).
valid_identity_rule(organized, paid_ads).
valid_identity_rule(organized, digital_store).
valid_identity_rule(organized, communicate_methodology).
valid_identity_rule(transgressor, digital_communications).
valid_identity_rule(transgressor, guerrilla_marketing).
valid_identity_rule(transgressor, carefull_deadlines).
valid_identity_rule(hate_numbers, hire_secretary).
valid_identity_rule(hate_numbers, outsource_accounting).
valid_identity_rule(_, explain_how_to_delegate).
valid_identity_rule(_, monitor_employees).
valid_identity_rule(_, design_processes).
valid_identity_rule(_, cross_control).
valid_identity_rule(_, define_billing_process).
valid_identity_rule(_, weekly_meetings).
valid_identity_rule(_, assign_roles).
valid_identity_rule(_, systematize).
valid_identity_rule(_, work_near_clients).
valid_identity_rule(_, use_CRM).
valid_identity_rule(_, communication_association). %TODO check _ is for anyone


regla_valida_combinacion(local, physical, physical_communications).
regla_valida_combinacion(local, physical, press_and_magazines).
regla_valida_combinacion(local, physical, influencers).
regla_valida_combinacion(local, physical, client_frequent_places).
regla_valida_combinacion(global, digital, digital_store).
regla_valida_combinacion(global, digital, talks_workshops).
regla_valida_combinacion(global, digital, digital_communications).
regla_valida_combinacion(global, digital, digital_marketing).
regla_valida_combinacion(global, digital, digital_payments).
regla_valida_combinacion(global, physical, logistic_association).
regla_valida_combinacion(global, physical, ecommerce_association).
regla_valida_combinacion(global, extrovert, international_contacts).
regla_valida_combinacion(global, allow_association, embassy_association).
regla_valida_combinacion(global, allow_association, international_association).
regla_valida_combinacion(extrovert, allow_association, brand_association).
regla_valida_combinacion(social, allow_association, brand_association).
regla_valida_combinacion(extrovert, allow_association, politic_mayor_association).
regla_valida_combinacion(social, allow_association, politic_mayor_association).
regla_valida_combinacion(introvert, allow_association, hire_business_manager).
regla_valida_combinacion(non_social, allow_association, hire_business_manager).
regla_valida_combinacion(has_savings_or_funding, allow_association, hire_business_manager).
regla_valida_combinacion(has_savings_or_funding, strengthen_your_team, hire_experienced_employees).
regla_valida_combinacion(travel, doesnt_have_passport, arrange_passport).


/* Replace For Testing Purposes
can_suggest(plan_empresarial, endeudate).
can_suggest(plan_empresarial, otra_sugerencia).
can_suggest(plan_comercial, mostrate).
can_suggest(plan_empresarial, inverti_en_emprendimiento).
can_suggest(plan_empresarial, guardalos_para_urgencias_asi_estas_tranquilo).
can_suggest(plan_empresarial, hire_secretary).
can_suggest(plan_empresarial, usar_agenda_personal).
can_suggest(plan_empresarial, funciono_combinada_diferentes_categorias).
can_suggest(plan_empresarial, funciono_combinada_misma_categoria).
valid_objetives_rule(quiere_reconocimiento, mostrate).
valid_objetives_rule(quiere_plata, endeudate).
valid_objetives_rule(quiere_plata, error_no_debe_aparecer). % Para pruebas
valid_contribution_rule(has_savings_or_funding, inverti_en_emprendimiento).
valid_contribution_rule(has_savings_or_funding, guardalos_para_urgencias_asi_estas_tranquilo).
valid_identity_rule(desorganizado, hire_secretary). 
valid_identity_rule(desorganizado, personal_agenda).
valid_identity_rule(desorganizado, error_no_debe_aparecer). % Para pruebas
regla_valida_combinacion(has_savings_or_funding, desorganizado, funciono_combinada_diferentes_categorias).
regla_valida_combinacion(quiere_plata, quiere_reconocimiento, funciono_combinada_misma_categoria).
regla_valida_combinacion(has_savings_or_funding, desorganizado, error_no_debe_aparecer). % Para pruebas
*/
/* 
Para Probar suggest(plan_empresarial, [quiere_plata, quiere_reconocimiento], [has_savings_or_funding], [desorganizado], Final_suggestions).
Otra prueba suggest(plan_comercial, [quiere_plata, quiere_reconocimiento], [has_savings_or_funding], [desorganizado], Final_suggestions).
Ejecutar en https://tio.run/##xVhtb9o6GP18@RWRpknd1C00QGknTeIdSigJhPLSqykyiUkMSRxsh7c/35mWUsIIDW1377fI@Dnn8TnHL61PsIOtb3SOHh4@Cx2lpAgdAjzqAAYFhgXoWQ6idoIGFiSInBWxx@CCYd13gKcDgwXAOReU4RgyNMP0XMj7mDDIP4qA8J95EWXIAFRHJvQYMoF5LmhrMOgZiA@PkAecL8KPb8I/nMzg8AQQne7MwM/gr5Nrh8q@nEcAg6dWI2C3C9H@LImE3C4yAjSmKNvhSCIDu0OunAnox1vygs3pge9Dzzw7qOxBbcKDPoG6Dwj/dmAEXGhKhA57oK8AHgZ7WdahBH5PJP5S/NbZ5hwmcJyznSm7zgYe2OF8GyXXIqKB0NI@hGq9JMEPoAn1zcFAYQRAqEEXukNIzp5Bz5WdPSoQaDlAnwGHG77T13byDlKkWe/Y0qfbdDLZvkXP1McMOp3kneY8QZ7ntydd2JjnfjbT4pjy4Yfi6VZ9SAv79r00dMzAj6F@p6lhkh2OSPY/jN9ZRxRYnDD8RxfXWq/N1XAIsMGRwOPNc@iyO/Tr0SaeCraT19qdls9taYQoewTHUrmzoO/CkVy@h/KdaVQJciHRjZCgh1TczNegFXA1YxQIJhqN1nwsiuQwFi8NhX2DaSDsRQBF9RTeA29tZy2whyOqhJ8/I@s4Z@KzUCsXa4qW2Hfo0Rjo8mBTQNDaHZ52GJj8rc@bfX025jnaiVBUDRcPPr7AuIGY8pqY8MibQcKQDjfjnolcxLXDsaqtABC@4/Dj@w/oAbGeb1nKIXlQqM5b8aYBcuIBPu0bHjAKDQLZejRWXcA/dMDZuT0@JBQ/PS9fLxwF3jpw@CXROs/PY3wg39dcRgvzmfStYC6iLnjB4TARTy6uEWfVCeQSYGNjQsjM44W8GwbC4YpXQAgmOu/ZhEPIXxqAdwAJP8Y@Cyr3VPBJAIeAJg4@SBjvkhfZmIPQ42GKU39inCKuShNSTCzgoRUwcUSkhJjFPFcHYhWv9k3K7h6Ce@rswZ@Q3EiGcBQiInh6quMvIq5G4lch8TigEjwERHj@18ife/DfGGv6xaeF@loPhDr7dfjPVYVtewq3sHP8/tUGymNoBDzDfJ8LNmM@/SGKDOHvJPDET59It93s5G7n5VKq01@V@35lINdK42Bodk3UpWo2L9mgeqP2NbU2Ebs1qyuqYyfQlEa7XYb1VnNYG8FVc6ayeoaR5XWRim5WkyaNvjd2JCZNuml0kbmodC8VudhLVtwcqGPmLKZKwVusLjVVXrWX2V6rNW7JLSmZDHpW8tIiAbWtzD3spJMdlJRFe1FoG1Z72ZglTWi3avnZaJxN01HpYuBVMsZdJuXfStMSzHfFpncl0cKons/1cKdn38NxWc6VCspwWXSdaX@yaM3naSWveI3LVs2epK78hYEsMT@46VoByvt2aljrO3XRYY07H7XgJCg0K9Os3WzkqmVRk916rgG1qeVPynUGcvWuJhUqSdQZ9bM0D0D53ppIlcZwUhElzHqW56sp1ugOstclOV24z5Rgoai156xBIZrRmeTdYPGmE@Tnl1qxvgrEJSsryWzrqggsV1VWfTpe3sn3bVHLNlFeKsnyxSBTq6aMmbXK1roTz6xju1y1k7hhs4Kcv1UuJlqnX1oZd9fVfq@YyY4MX53ngutgmppdw5SbnVUW0nAGkwuWSbrSCraraHEtV1Gzbl5djnsDsHDLqr1SO35/JReXnduu0SaTu3RrtvAqBpD8mx5PbqXm2WNTdAarUao@YoXU9NZuZ7vynavQaqo1zYtK5Qq3MulbtV7K2WLiq/jw8P9swd8
*/

/* UPDATED
https://tio.run/##1Vtrj7JKtv58@leQTHayZ9KzFe9OMoko3m8o3k8mpoASUKiCKlDxz88U9k27QbF3v3NyPrXCetZate5VZTsEW1j/Oz2Y//439XUdUu93QfV8YK0dC6C1ipEHj94z18TAos9cjX0npuJ7Jkbsa1uDyDO9YO0RYHrsQcNEDPrKKaT5K/ePv3P/w21MpK2xsoWeuYf0kuCmuPOfK3bPL6zUSz3us/ukdi0O/cbefFvXXc5fLNCOgL6xtc0j1BIv/p6t@5@5MTHAcSDSfv9itxtrfuYkAtcOIJ75yXXv7GIIohfL@N3kFcXny1KiIumPp6cfC6MwKkNmwLJ@5@T3F69@wghGSrkp5IMLW2yEyHf1/yTzUHVOZTQ38/VKGxvaCiTnqHg@Mww13APLvDQm8S34QnKBfVP6V@XbfT/ESU4k@Non8Wpc@uanBH7fT5c8n68EfPjtUssX112hIlz40zXtvusiJCYUeO23SPGXLvsRQX/CX4AA1YPEZM9V8KqNBrTnT@I@vPeu8Ivn4vARXvzVLSS0wmUT@cIj7AUvSrwwWVtM7etW8eV1rORrFnfC6fPSo1fe/yr8Opq@rvkP7iKWfkLK90OpYRLqvfCNttErnQwZG@0WIaeZmw0kzOzXTC@RjIxA3QLrc1QCppqtsLarhsu@BF1Lu47KJGJCeyB8RcH985@faBivp9@48bRXl9nfyVAccuwNohbwIOdhDiKdLc14ezdhKnCCpkGNG7MkopxPTaRzwPewzRAa54U6sie/Iwg1yqm@6oem@@sbgzHcmxQQzvUhZwHKMV@F61BN9lkLJWrsQ/jibCLKMXYQccCyIcLsG@J8hENCi30LHQtZVANqsoVy2NqzJOaAzqCAhGBgmE@XAcEsbUOimq9B8cy8RaDqrW1AdjBUm5n2Jj2b2s/lYg0oxez5qztuYkwWeASdSdmzMA5Z2aH3UNj3KPaJCtcUMDvfI/eAtaPrAyY7amDnPjkBGuNs4MM9Shb4bK3B9xf8AFBhgac9AnCwZYbesEGAyWMqbiyfRR0kd01lsBBZK2GYQ0qZJARYwN4DhY5YIwjIWrVMlqV3pfgUrmvj/j0yG57D9NyHLwnPJQ7aDoEstxj5M6f7gLCqjmm4hQBrn@gvScasZK4ZhH0K89z1TQt/kvqV2XnsAR5YU6gS6IVP72J89mHNbMV6y9phdg6D4S7IRHvINipr@PocaaYd2u@@ikDzmWsYgeMwi5MvFgpN6SPW6M@j22v4ADYUAC3KOZ9JLayG@yJ89gWC3jnTEuA0Uze9EOlhAhPQO0ZATfVcJy5ePiLpYeD90vEZAV/jEt5Juc@40LuhIehag@puTSDQggSw62ePifwoow/b5eMZG0@gZ2AtPLRJpDBgJQMoTDZbKDX1ZLa5VZE@U7P8JR7LRsti1WC9wZaFD8mQYaEBqmHCPbTDwrQ@F93o1vcZq/uQENNik8tlw3yK3NKywsL6OvMxqx3MXy9ZHNlwH4GHCc9KWDiRAx2cwpr8IIdrOz@CfKnk6w2BbHZhH5hN1IfFf022W2gmwgMs35AGfY3FYTLymDSLRLKyvofWp4EgktJghOuNj5LQvlWxyLIcidAtrLw0gJhhKRJ1rsrxxfkW5nNhjqR9JXpQwjvqZVFJYQ7Bms9yI4xuCsneVOGDgn8Rh3PSxS4WQ8qSYYfw4VEz/QzypnYorF0Eb8K9UdLSc4lJmK6XkIdWEmCf1e@XyvKnoI@FGstKy3vHXoxBCagTJc41JL6TRoKxpSXW7ZI2kWaXgAf1YtM0gjdHimSwtw1dDDVr5ZdDTvS2KCn21g4pKY8ELTMCdWtqe4o7TTXYtoSCfbjFub0ZSMTgS/DcoX9wz3SL5/tIdmtWu8Xgcka7PbU9RR1usrkTEx0g8wQ0HLOB45Ig2TYuYhcXBYRHj@DQYzdKbSziS6ePpYwryfGAr@PKNe1L0Uys9Rv5HZXfyJLp@059T1mHZdI5vxJq@06fTI8P8nuKGL6NCfZpYk0@AMlUYaPgRzzF7G3v4G7VoDvQu1U@AfK60F8DwpHhI/AeWN4l8NH1XWIfXGA09NYKWaEBYYt4cH0fsNvjUBzqziT0CWaB1/0k9QILRrSMO/TRM8cd0L254x484nghEfDi9DCyBhnBmRpsCLNCcjmv7QJqd813QZnEcBfkj5nsfIOhhxsDTB4Mv2to9IlHFG4dfegbQ/px3BtDcCOzud/OFymqwTb33JozKbfBhAMoYGPm09NT7NXS68b3Y28ef9b4AI/IA5nk@OvZMjku9jAmlsXbCcP77vxzBCZHfu1fj0tNbvNYFpcheRf9YbqYO6wHOMSd/95lcTGVxR703GUSsdeIvqT6Dqdbd1ex/C6WlXD7FsvqrcX@WT63Vbq1K/yOat/idzEyRbCMu3aLZXc5oPwEv6ud4QMMn55Sf@PG8FyQuAarzJPXG3HJJw6mkN65yLo87L1NiVmvWn/cn0fRswW93B@y5o9puAWEv/AO7v/nnePGR6HD8Zv3GVYzX35cAek6nDh0zCjpdxjZJrXBB48HLwsuXPbztwRssGG5yrTVoMIKOfMYVMMA5n4Lf0kKWGf3Iauq/6Wjmm8dvfyfH3l8AiY1abKa84n5A2Eay/86AmKiLlEYf2sJSe3zt1RYQ5/OzyTCejXh4rPufxMs6l@M7EKx8OuVav@K/uHz0HtXiosrq79QfH0LVZ8FbvirJ8PzHPqPVIq9@4P4KPWXvxxnhqeUcaEp8aXKeD52dkjja@n0qLlDE9jWZFPvGFJPdoNdYE53fXl8pEZRTWXz9nxK221xzmeLxU27IiJUmqBWr8BLtD30lKw8bBm5Su2YsRxB14TtyRWEZcPQF3g@KpgabjcbptxG1fnxWKnVlhqf1buqqB8WwnAMp7mxHgz6UnrR3xZtUWxLOVcodcr5@nzRFhrjVmc/WvZxI9@zDdIf6itTqEg7Aaq9UldSSu0U6p/0kjAaIVjsH/opneQHxCi5FVRXBb2gzduZWrZWblV6bbuereUCYSvb3cHekGtt0U8PfSQgfOT3gU6zjg7L4ul0KLrDY1VRu6KEmwXxsE1ptlBfNI2uIeSLuFsSWvqqONeAUW3lpY6Ul1MDZZU3DrbaCU5ItosnfQkzw0apGSwWbbdbTQ/aFaPpljv9uoQFxJ/UhrAcjQW3Xl/4u0H75OSrp/xck2Q8AqIloEOz1SwWJ3xWCUSru5vD1DLtbhRN7K32u4XE99X@0MnuEFyWRqsi8gJNy3S2aLNVJjlnG@SWG7MwW5VlYV8sk3Ra65@EbaFRcQqWsTMyQ1lapraD8mp8HC@RKJbGx81i7qYG/EJo035zfBhKA7ViBsPUhKRlAGsETPiyq1m07IHlCMPDpDUl9gkPU7XdLKgYqa4GZqOOarbG21VNN/iJehpAvbEQ@OVx1O4Y7oBHB2r6o0PDLA2MRUYEskjHo2qjPJ5AIVP2VkHmYARD1@iUUu0Kza0q3dO0Rhcg584zrQ1Oj7e4ZFcno4EIWqt8ptnZlohaUTaLdCa/RcCcVafiWJUkUhT8dnNZctxlqW8qI7U7ErebLcKWeuwtRApcT6jWKrmUuK0cUlhQmlDhUbe9sEZuP6@UwLKq@u2q5KeV1lboiqPeCm7H84UqpLS@uPIn6UqnOkpJcnnTOx4a2a1zqNQW4yFNScvsQc@WNXWs70/2RvaWtYLZQ9tqbiKMJ0HBr883sxocycvmYDui234uNy81D0ott3QWI0G3h35qZdSl9uLoCtpB6EilZaUWkOxMqnaENhQ6eq4iV7f7nbFZ2W1plMs0u9Ns2US1ri8bA3lSO@l4PD2oU3lndLYNqaG2lsZ8X95lu0WjUIMVQg@ryihbN5tqdWS2kVFw/f6@7eabOUs1ShNTr28P9XFrW@FLrFukxE2zuS8cAWxULCwZIilqm600W848eHCztCWVUt60GdgDXBVP4qZT6g3sfiUlN7visLXvSGJ9ki@3vXKW5ptFlJ913TRfmVWyeas90Lq5TBVru@zUmeNMr2zr0JUyA2WaqSuUdwPfXQabkVUHxcVS4WdosGyWGjO1AAKIwTi/mI9NOz/fBWCw37Lwr60Gvm2ld4qNtVpp5mtGb@YdVLcp2b3uqnuY@bS3nc0WZL7IzApkMC92erK9ElvOvOS1TUGZeycxS51OX7M64wbkG7jJr4qZlW5N5mYW7NEKdI6DNN9yln511qcrreMvmJf78qm1aThItdJql5XiFK92NZQtDY5ztTCrUecwX8gaWFQC0M8iIM/3sJ3tzWgGOt1iyVjWaX9SyRVmuBrsvQywtmSYXYyXy3SxVVzonZqe7paHNDs/7Vx7Nt6V@QLRm7wLZ1KApk11P/c7xtSVtdGqrPTTYlrMZx2nbamrw9SoW6eWO88XqMP7@pB6qjWcZXKn/FjHwOTzhWO1vSJjG060pdS065UJsnj3uNdJvSNTEsxPxNV1OuNn883EgVmKssqs1RtYDdilKDjK1YlbAH1bWXR5gienwnHr8wG/KxoGzXXVPT/1O5aLFjxeaeXNbONWlsEy11/ks0j3Pd12HO2QlxU0m87TSGjuDv5cVojM6g0Brbo345snxcprW0RF2hJ7LuHlYTaf6ozhAmm@z2rTxM@OibcX3KojluxjXlLchZ2ZDyaaAMgU4MoSL6blwcpfFfcBAvsRcDF/Wnrd/MjN9n1L8WbFbmbeM93U9lCSyvSgldhA8fF/dlE/bPqhJi5//JZ5vTHPY@N/AA
*/