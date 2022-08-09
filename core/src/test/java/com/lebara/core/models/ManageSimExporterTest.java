package com.lebara.core.models;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class })
class ManageSimExporterTest {

    private final AemContext aemContext = new AemContext();

    ManageSimExporter manageSimExporter = new ManageSimExporter();

    @BeforeEach
    void setUp() {
        aemContext.addModelsForClasses(ManageSimExporter.class);
        aemContext.load().json("/managesim-component.json", "/managesim");
        aemContext.currentResource("/managesim");
        manageSimExporter = aemContext.request().adaptTo(ManageSimExporter.class);
    }

    @Test
    void testGetFollowLinkLabel() {
        assertEquals("Veuillez suivre les instructions de l'email pour finaliser l'opération", manageSimExporter.getFollowLinkLabel());
    }

    @Test
    void testGetCtaContinueLabel() {
        assertEquals("Continuer", manageSimExporter.getCtaContinueLabel());
    }

    @Test
    void testGetNoLabel() {
        assertEquals("Non", manageSimExporter.getNoLabel());
    }

    @Test
    void testGetMailNotReceivedLabel() {
        assertEquals("Si vous n'avez pas encore reçu l'email", manageSimExporter.getMailNotReceivedLabel());
    }

    @Test
    void testGetClickHereLabel() {
        assertEquals("Cliquez ici ", manageSimExporter.getClickHereLabel());
    }

    @Test
    void testGetConfirmationEmailLabel() {
        assertEquals("Un lien de confirmation vous a été envoyé par email.", manageSimExporter.getConfirmationEmailLabel());
    }

    @Test
    void testGetLinkSimLabel() {
        assertEquals("Veuillez remplir le formulaire ci-dessous pour lier votre carte SIM.", manageSimExporter.getLinkSimLabel());
    }

    @Test
    void testIsShowTermsAndConditions() {
        assertEquals(true, manageSimExporter.isShowTermsAndConditions());
    }

    @Test
    void testGetDelinkConfirmationMsg() {
        assertEquals("Etes-vous sûr de vouloir dissocier le numéro de téléphone {0} de votre compte ?", manageSimExporter.getDelinkConfirmationMsg());
    }

    @Test
    void testIsTextIsRich() {
        assertEquals(true, manageSimExporter.isTextIsRich());
    }

    @Test
    void testGetMobilePlaceholderLabel() {
        assertEquals("Numéro de téléphone Lebara", manageSimExporter.getMobilePlaceholderLabel());
    }

    @Test
    void testGetTermsAndConditionsLabel() {
        assertEquals("Terms", manageSimExporter.getTermsAndConditionsLabel());
    }

    @Test
    void testGetTitle() {
        assertEquals("Ajouter une carte SIM", manageSimExporter.getTitle());
    }

    @Test
    void testGetLinkedSimDesc() {
        assertEquals("Il y a {0} numéro associé à votre compte MyLebara", manageSimExporter.getLinkedSimDesc());
    }

    @Test
    void testGetDelinkLabel() {
        assertEquals("Dissocier la SIM", manageSimExporter.getDelinkLabel());
    }

    @Test
    void testGetNoSimLabel() {
        assertEquals("Je n'ai pas de SIM", manageSimExporter.getNoSimLabel());
    }

    @Test
    void testGetActiveMonthPlanLabel() {
        assertEquals("Ce numéro a un forfait actif", manageSimExporter.getActiveMonthPlanLabel());
    }

    @Test
    void testGetToResendLabel() {
        assertEquals("pour les renvoyer.", manageSimExporter.getToResendLabel());
    }

    @Test
    void testGetAttachNewSim() {
        assertEquals("Associer une nouvelle carte SIM", manageSimExporter.getAttachNewSim());
    }

    @Test
    void testGetSendSMSOtpErrorMessages() {
        assertEquals("ICCD do not match", manageSimExporter.getSendSMSOtpErrorMessages().get("ICCID_DO_NOT_MATCH"));
    }

    @Test
    void testGetExportedType() {
        assertEquals("lebara/components/dashboard/managesim", manageSimExporter.RESOURCE_TYPE);
    }

}
